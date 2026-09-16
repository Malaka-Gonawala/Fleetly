from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.database import get_db
from app.models import Booking, Payment, LicenseVerification, VerificationStatus, PaymentStatus, User
from app.schemas import BookingCreate, BookingOut, PaymentSimulate
from app.auth import get_current_user
import uuid
from datetime import date, datetime, timezone

router = APIRouter(prefix="/api/bookings", tags=["bookings"])

@router.post("/", response_model=BookingOut)
async def create_booking(booking: BookingCreate, db: AsyncSession = Depends(get_db), user: User = Depends(get_current_user)):
    # 1. Check if user is verified (License check)
    # result = await db.execute(select(LicenseVerification).where(LicenseVerification.user_id == user.id))
    # verification = result.scalars().first()
    
    # if not verification or verification.status != VerificationStatus.verified:
    #     raise HTTPException(status_code=403, detail="License verification required before booking")
    
    # 2. Check for overlapping bookings via Database Constraints (This is handled by the EXCLUDE gist in Postgres)
    # We will simulate the error if Postgres throws an IntegrityError, but for demo without Postgres:
    # We'll just create it.
    
    # Mocking a vehicle_unit_id since we need a physical unit
    # In reality, we'd query for an available VehicleUnit for the requested VehicleModel
    
    mock_total_price = 150.00
    
    new_booking = Booking(
        renter_id=user.id,
        vehicle_unit_id=uuid.uuid4(), # Mocked
        pickup_at=booking.pickup_at,
        dropoff_at=booking.dropoff_at,
        pickup_location=booking.pickup_location,
        total_price=mock_total_price
    )
    db.add(new_booking)
    await db.commit()
    await db.refresh(new_booking)
    return new_booking

@router.get("/my-bookings")
async def get_my_bookings(db: AsyncSession = Depends(get_db), user: User = Depends(get_current_user)):
    result = await db.execute(select(Booking).where(Booking.renter_id == user.id).order_by(Booking.created_at.desc()))
    return result.scalars().all()

@router.post("/{booking_id}/pay")
async def simulate_payment(booking_id: uuid.UUID, payment_data: PaymentSimulate, db: AsyncSession = Depends(get_db), user: User = Depends(get_current_user)):
    result = await db.execute(select(Booking).where(Booking.id == booking_id, Booking.renter_id == user.id))
    booking = result.scalars().first()
    
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
        
    # SIMULATED PAYMENT LOGIC
    # We do NOT send this to Stripe. We just validate locally and create a mock record.
    last4 = payment_data.card_number[-4:] if len(payment_data.card_number) >= 4 else "0000"
    
    mock_payment = Payment(
        booking_id=booking.id,
        mock_transaction_id=f"sim_txn_{uuid.uuid4().hex[:12]}",
        card_last4=last4,
        amount_total=booking.total_price,
        platform_fee_amount=booking.total_price * 0.15, # 15% platform fee
        owner_payout_amount=booking.total_price * 0.85,
        status=PaymentStatus.succeeded
    )
    
    booking.status = "confirmed"
    
    db.add(mock_payment)
    await db.commit()
    return {"message": "Payment successful", "transaction_id": mock_payment.mock_transaction_id}

@router.post("/verify-license")
async def simulate_license_verification(
    front_image: UploadFile = File(...),
    back_image: UploadFile = File(...),
    selfie: UploadFile = File(...),
    issue_date_str: str = None, # Passed as a form field for the demo
    db: AsyncSession = Depends(get_db), 
    user: User = Depends(get_current_user)
):
    # SIMULATED LOGIC: We discard the files immediately.
    await front_image.read()
    await back_image.read()
    await selfie.read()
    # Data is in memory, not saved anywhere. Let it be garbage collected.
    
    issue_date = date.fromisoformat(issue_date_str) if issue_date_str else date(2020, 1, 1)
    
    # Italian rule: Must be issued at least 1 year ago
    today = date.today()
    one_year_passed = (today.year - issue_date.year) > 1 or \
                      ((today.year - issue_date.year) == 1 and (today.month, today.day) >= (issue_date.month, issue_date.day))
                      
    status = VerificationStatus.verified if one_year_passed else VerificationStatus.failed
    
    verification = LicenseVerification(
        user_id=user.id,
        status=status,
        license_issue_date=issue_date,
        one_year_rule_passed=one_year_passed,
        verified_at=datetime.now(timezone.utc) if one_year_passed else None
    )
    
    db.add(verification)
    await db.commit()
    
    return {"status": status, "one_year_rule_passed": one_year_passed, "message": "Verification simulation complete"}
