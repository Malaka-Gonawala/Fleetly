from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List, Optional
from app.database import get_db
from app.models import VehicleModel, VehicleCategory, TransmissionType, VehicleUnit
from app.schemas import VehicleModelOut, VehicleModelCreate
from app.auth import get_current_user
import uuid

router = APIRouter(prefix="/api/vehicles", tags=["vehicles"])

@router.get("/", response_model=List[VehicleModelOut])
async def list_vehicles(
    db: AsyncSession = Depends(get_db),
    brand: Optional[str] = None,
    category: Optional[VehicleCategory] = None,
    transmission: Optional[TransmissionType] = None
):
    query = select(VehicleModel).where(VehicleModel.is_listed == True)
    
    if brand:
        query = query.where(VehicleModel.brand.ilike(f"%{brand}%"))
    if category:
        query = query.where(VehicleModel.category == category)
    if transmission:
        query = query.where(VehicleModel.transmission == transmission)
        
    result = await db.execute(query)
    vehicles = result.scalars().all()
    
    # In a real scenario, we'd also join with vehicle_units and bookings to determine availability 
    # based on query params (pickup/dropoff dates). 
    # We will simulate the availability indicator on the frontend or via a separate endpoint for demo.
    
    return vehicles

@router.get("/{vehicle_id}", response_model=VehicleModelOut)
async def get_vehicle(vehicle_id: uuid.UUID, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(VehicleModel).where(VehicleModel.id == vehicle_id))
    vehicle = result.scalars().first()
    if not vehicle:
        raise HTTPException(status_code=404, detail="Vehicle not found")
    return vehicle

@router.post("/", response_model=VehicleModelOut)
async def create_vehicle(vehicle: VehicleModelCreate, db: AsyncSession = Depends(get_db)): #, user = Depends(get_current_user)
    new_vehicle = VehicleModel(**vehicle.model_dump())
    db.add(new_vehicle)
    await db.commit()
    await db.refresh(new_vehicle)
    return new_vehicle

@router.put("/{vehicle_id}", response_model=VehicleModelOut)
async def update_vehicle(vehicle_id: uuid.UUID, vehicle_update: VehicleModelCreate, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(VehicleModel).where(VehicleModel.id == vehicle_id))
    vehicle = result.scalars().first()
    if not vehicle:
        raise HTTPException(status_code=404, detail="Vehicle not found")
        
    update_data = vehicle_update.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(vehicle, key, value)
        
    await db.commit()
    await db.refresh(vehicle)
    return vehicle

@router.delete("/{vehicle_id}")
async def delete_vehicle(vehicle_id: uuid.UUID, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(VehicleModel).where(VehicleModel.id == vehicle_id))
    vehicle = result.scalars().first()
    if not vehicle:
        raise HTTPException(status_code=404, detail="Vehicle not found")
        
    await db.delete(vehicle)
    await db.commit()
    return {"message": "Vehicle deleted successfully"}
