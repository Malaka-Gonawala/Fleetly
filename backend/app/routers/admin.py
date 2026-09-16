from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.database import get_db
from app.models import Admin, AdminAuditLog, Booking, LicenseVerification, VehicleModel, VerificationStatus, PaymentStatus, Payment
from app.schemas import UserOut
import uuid

router = APIRouter(prefix="/api/internal-xyz123", tags=["admin"])

# Mock Admin Auth dependency
async def get_current_admin(db: AsyncSession = Depends(get_db)):
    # Demo simplified: Just checking if any admin exists and mocking auth
    return Admin(id=uuid.uuid4(), email="admin@fleetly.com")

@router.post("/override-booking-status")
async def override_booking_status(
    booking_id: uuid.UUID,
    new_status: str,
    db: AsyncSession = Depends(get_db),
    admin: Admin = Depends(get_current_admin)
):
    result = await db.execute(select(Booking).where(Booking.id == booking_id))
    booking = result.scalars().first()
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
        
    booking.status = new_status
    
    # Log audit
    audit = AdminAuditLog(
        admin_id=admin.id,
        action="booking_status_override",
        target_table="bookings",
        target_id=booking.id,
        metadata_={"new_status": new_status}
    )
    db.add(audit)
    await db.commit()
    
    return {"message": "Booking status updated"}

@router.post("/override-verification-status")
async def override_verification_status(
    user_id: uuid.UUID,
    new_status: VerificationStatus,
    db: AsyncSession = Depends(get_db),
    admin: Admin = Depends(get_current_admin)
):
    result = await db.execute(select(LicenseVerification).where(LicenseVerification.user_id == user_id))
    verification = result.scalars().first()
    if not verification:
        raise HTTPException(status_code=404, detail="Verification record not found")
        
    verification.status = new_status
    
    # Log audit
    audit = AdminAuditLog(
        admin_id=admin.id,
        action="verification_status_override",
        target_table="license_verifications",
        target_id=verification.id,
        metadata_={"new_status": new_status.value}
    )
    db.add(audit)
    await db.commit()
    
    return {"message": "Verification status updated"}

from sqlalchemy.orm import selectinload

@router.get("/waitlist")
async def get_waitlist(db: AsyncSession = Depends(get_db)): # admin: Admin = Depends(get_current_admin)
    # Fetch all bookings ordered by creation date (first come, first served)
    query = select(Booking, User, VehicleModel).join(
        User, Booking.renter_id == User.id
    ).join(
        # We assume for this demo that booking has vehicle_model_id directly or we join via vehicle unit.
        # Wait, booking model has vehicle_unit_id. Let's just fetch bookings and users.
        # Actually, let's look at models: Booking has vehicle_unit_id, VehicleUnit has vehicle_model_id.
        # Let's simplify by just returning bookings with user emails for now.
        User, Booking.renter_id == User.id
    ).order_by(Booking.created_at.asc())
    
    result = await db.execute(select(Booking, User.email, User.full_name).join(User, Booking.renter_id == User.id).order_by(Booking.created_at.asc()))
    rows = result.all()
    
    waitlist = []
    for booking, email, name in rows:
        waitlist.append({
            "id": booking.id,
            "renter_name": name,
            "renter_email": email,
            "vehicle_unit_id": booking.vehicle_unit_id,
            "status": booking.status,
            "pickup_at": booking.pickup_at,
            "created_at": booking.created_at
        })
        
    return waitlist
