from pydantic import BaseModel, EmailStr, UUID4, Field, ConfigDict
from datetime import datetime, date
from typing import Optional, List
from app.models import (
    UserRole, OtpChannel, OtpPurpose, VerificationStatus,
    VehicleCategory, TransmissionType, FuelType, UnitStatus,
    BookingStatus, PaymentStatus
)

class UserBase(BaseModel):
    email: EmailStr
    full_name: str
    role: UserRole = UserRole.renter

class UserCreate(UserBase):
    password: str
    phone: Optional[str] = None

class UserOut(UserBase):
    id: UUID4
    email_verified: bool
    phone_verified: bool
    is_active: bool
    created_at: datetime
    
    model_config = ConfigDict(from_attributes=True)

class Token(BaseModel):
    access_token: str
    token_type: str

class OTPVerify(BaseModel):
    email: EmailStr
    code: str
    purpose: OtpPurpose

class VehicleModelBase(BaseModel):
    brand: str
    model_name: str
    category: VehicleCategory
    transmission: TransmissionType
    fuel_type: FuelType
    seats: int
    price_per_day: float
    deposit_amount: float = 0
    description: Optional[str] = None
    mileage_limit_km: Optional[int] = None
    insurance_included: bool = True
    is_listed: bool = True

class VehicleModelCreate(VehicleModelBase):
    owner_id: Optional[UUID4] = None

class VehicleModelOut(VehicleModelBase):
    id: UUID4
    owner_id: Optional[UUID4] = None
    created_at: datetime
    updated_at: datetime
    
    model_config = ConfigDict(from_attributes=True)

class BookingBase(BaseModel):
    vehicle_model_id: UUID4
    pickup_at: datetime
    dropoff_at: datetime
    pickup_location: str

class BookingCreate(BookingBase):
    pass

class BookingOut(BookingBase):
    id: UUID4
    renter_id: UUID4
    vehicle_unit_id: UUID4
    status: BookingStatus
    total_price: float
    deposit_amount: float
    created_at: datetime
    updated_at: datetime
    
    model_config = ConfigDict(from_attributes=True)

class PaymentSimulate(BaseModel):
    card_number: str
    expiry: str
    cvc: str
    name: str

class LicenseUploadMock(BaseModel):
    issue_date: date
    expiry_date: date
