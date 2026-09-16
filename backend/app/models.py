import enum
import uuid
from datetime import date, datetime
from sqlalchemy import Column, String, Boolean, Integer, Numeric, DateTime, ForeignKey, Enum, Date, text, LargeBinary, SmallInteger, Uuid, JSON
from sqlalchemy.orm import relationship
from app.database import Base
from sqlalchemy.sql import func

class UserRole(str, enum.Enum):
    renter = 'renter'
    owner = 'owner'

class User(Base):
    __tablename__ = 'users'
    id = Column(Uuid(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email = Column(String, unique=True, nullable=False, index=True)
    phone_encrypted = Column(LargeBinary, nullable=True)
    password_hash = Column(String, nullable=False)
    full_name = Column(String, nullable=False)
    role = Column(Enum(UserRole), nullable=False, default=UserRole.renter)
    email_verified = Column(Boolean, nullable=False, default=False)
    phone_verified = Column(Boolean, nullable=False, default=False)
    is_active = Column(Boolean, nullable=False, default=True)
    created_at = Column(DateTime(timezone=True), nullable=False, server_default=func.now())
    updated_at = Column(DateTime(timezone=True), nullable=False, server_default=func.now(), onupdate=func.now())

    @property
    def phone(self):
        if self.phone_encrypted:
            try:
                return self.phone_encrypted.decode('utf-8')
            except Exception:
                return None
        return None

class OtpChannel(str, enum.Enum):
    email = 'email'
    sms = 'sms'

class OtpPurpose(str, enum.Enum):
    signup = 'signup'
    login_step_up = 'login_step_up'
    password_reset = 'password_reset'
    phone_change = 'phone_change'
    email_change = 'email_change'

class OtpCode(Base):
    __tablename__ = 'otp_codes'
    id = Column(Uuid(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(Uuid(as_uuid=True), ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
    channel = Column(Enum(OtpChannel), nullable=False)
    purpose = Column(Enum(OtpPurpose), nullable=False)
    code_hash = Column(String, nullable=False)
    expires_at = Column(DateTime(timezone=True), nullable=False)
    consumed_at = Column(DateTime(timezone=True), nullable=True)
    attempt_count = Column(Integer, nullable=False, default=0)
    created_at = Column(DateTime(timezone=True), nullable=False, server_default=func.now())

class RefreshToken(Base):
    __tablename__ = 'refresh_tokens'
    id = Column(Uuid(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(Uuid(as_uuid=True), ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
    token_hash = Column(String, nullable=False)
    revoked = Column(Boolean, nullable=False, default=False)
    expires_at = Column(DateTime(timezone=True), nullable=False)
    created_at = Column(DateTime(timezone=True), nullable=False, server_default=func.now())

class VerificationStatus(str, enum.Enum):
    not_submitted = 'not_submitted'
    pending = 'pending'
    verified = 'verified'
    failed = 'failed'
    expired = 'expired'

class LicenseVerification(Base):
    __tablename__ = 'license_verifications'
    id = Column(Uuid(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(Uuid(as_uuid=True), ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
    provider = Column(String, nullable=False, default='simulated')
    status = Column(Enum(VerificationStatus), nullable=False, default=VerificationStatus.not_submitted)
    license_country = Column(String, nullable=True)
    license_issue_date = Column(Date, nullable=True)
    license_expiry_date = Column(Date, nullable=True)
    one_year_rule_passed = Column(Boolean, nullable=True)
    verified_at = Column(DateTime(timezone=True), nullable=True)
    created_at = Column(DateTime(timezone=True), nullable=False, server_default=func.now())
    updated_at = Column(DateTime(timezone=True), nullable=False, server_default=func.now(), onupdate=func.now())

class VehicleCategory(str, enum.Enum):
    sedan = 'sedan'
    suv = 'suv'
    hatchback = 'hatchback'
    van = 'van'
    coupe = 'coupe'
    convertible = 'convertible'
    other = 'other'

class TransmissionType(str, enum.Enum):
    automatic = 'automatic'
    manual = 'manual'

class FuelType(str, enum.Enum):
    petrol = 'petrol'
    diesel = 'diesel'
    electric = 'electric'
    hybrid = 'hybrid'

class VehicleModel(Base):
    __tablename__ = 'vehicle_models'
    id = Column(Uuid(as_uuid=True), primary_key=True, default=uuid.uuid4)
    owner_id = Column(Uuid(as_uuid=True), ForeignKey('users.id'), nullable=True)
    brand = Column(String, nullable=False)
    model_name = Column(String, nullable=False)
    category = Column(Enum(VehicleCategory), nullable=False)
    transmission = Column(Enum(TransmissionType), nullable=False)
    fuel_type = Column(Enum(FuelType), nullable=False)
    seats = Column(SmallInteger, nullable=False)
    price_per_day = Column(Numeric(10, 2), nullable=False)
    deposit_amount = Column(Numeric(10, 2), nullable=False, default=0)
    description = Column(String, nullable=True)
    mileage_limit_km = Column(Integer, nullable=True)
    insurance_included = Column(Boolean, nullable=False, default=True)
    is_listed = Column(Boolean, nullable=False, default=True)
    created_at = Column(DateTime(timezone=True), nullable=False, server_default=func.now())
    updated_at = Column(DateTime(timezone=True), nullable=False, server_default=func.now(), onupdate=func.now())
    
    images = relationship("VehicleImage", back_populates="model", cascade="all, delete-orphan")
    units = relationship("VehicleUnit", back_populates="model", cascade="all, delete-orphan")

class VehicleImage(Base):
    __tablename__ = 'vehicle_images'
    id = Column(Uuid(as_uuid=True), primary_key=True, default=uuid.uuid4)
    vehicle_model_id = Column(Uuid(as_uuid=True), ForeignKey('vehicle_models.id', ondelete='CASCADE'), nullable=False)
    url = Column(String, nullable=False)
    alt_text = Column(String, nullable=False)
    position = Column(SmallInteger, nullable=False, default=0)
    
    model = relationship("VehicleModel", back_populates="images")

class UnitStatus(str, enum.Enum):
    active = 'active'
    maintenance = 'maintenance'
    retired = 'retired'

class VehicleUnit(Base):
    __tablename__ = 'vehicle_units'
    id = Column(Uuid(as_uuid=True), primary_key=True, default=uuid.uuid4)
    vehicle_model_id = Column(Uuid(as_uuid=True), ForeignKey('vehicle_models.id', ondelete='CASCADE'), nullable=False)
    license_plate_encrypted = Column(LargeBinary, nullable=False)
    status = Column(Enum(UnitStatus), nullable=False, default=UnitStatus.active)
    created_at = Column(DateTime(timezone=True), nullable=False, server_default=func.now())

    model = relationship("VehicleModel", back_populates="units")

class BookingStatus(str, enum.Enum):
    pending_payment = 'pending_payment'
    confirmed = 'confirmed'
    active = 'active'
    completed = 'completed'
    cancelled = 'cancelled'

class Booking(Base):
    __tablename__ = 'bookings'
    id = Column(Uuid(as_uuid=True), primary_key=True, default=uuid.uuid4)
    renter_id = Column(Uuid(as_uuid=True), ForeignKey('users.id'), nullable=False)
    vehicle_unit_id = Column(Uuid(as_uuid=True), ForeignKey('vehicle_units.id'), nullable=False)
    pickup_at = Column(DateTime(timezone=True), nullable=False)
    dropoff_at = Column(DateTime(timezone=True), nullable=False)
    pickup_location = Column(String, nullable=False)
    status = Column(Enum(BookingStatus), nullable=False, default=BookingStatus.pending_payment)
    total_price = Column(Numeric(10, 2), nullable=False)
    deposit_amount = Column(Numeric(10, 2), nullable=False, default=0)
    created_at = Column(DateTime(timezone=True), nullable=False, server_default=func.now())
    updated_at = Column(DateTime(timezone=True), nullable=False, server_default=func.now(), onupdate=func.now())

class PaymentStatus(str, enum.Enum):
    pending = 'pending'
    succeeded = 'succeeded'
    failed = 'failed'
    refunded = 'refunded'
    partially_refunded = 'partially_refunded'

class Payment(Base):
    __tablename__ = 'payments'
    id = Column(Uuid(as_uuid=True), primary_key=True, default=uuid.uuid4)
    booking_id = Column(Uuid(as_uuid=True), ForeignKey('bookings.id'), nullable=False)
    mock_transaction_id = Column(String, nullable=False)
    card_last4 = Column(String(4), nullable=True)
    amount_total = Column(Numeric(10, 2), nullable=False)
    platform_fee_amount = Column(Numeric(10, 2), nullable=False)
    owner_payout_amount = Column(Numeric(10, 2), nullable=False)
    status = Column(Enum(PaymentStatus), nullable=False, default=PaymentStatus.pending)
    created_at = Column(DateTime(timezone=True), nullable=False, server_default=func.now())
    updated_at = Column(DateTime(timezone=True), nullable=False, server_default=func.now(), onupdate=func.now())

class Review(Base):
    __tablename__ = 'reviews'
    id = Column(Uuid(as_uuid=True), primary_key=True, default=uuid.uuid4)
    booking_id = Column(Uuid(as_uuid=True), ForeignKey('bookings.id'), unique=True, nullable=False)
    renter_id = Column(Uuid(as_uuid=True), ForeignKey('users.id'), nullable=False)
    vehicle_model_id = Column(Uuid(as_uuid=True), ForeignKey('vehicle_models.id'), nullable=False)
    rating = Column(SmallInteger, nullable=False)
    comment = Column(String, nullable=True)
    created_at = Column(DateTime(timezone=True), nullable=False, server_default=func.now())

class ContactMessage(Base):
    __tablename__ = 'contact_messages'
    id = Column(Uuid(as_uuid=True), primary_key=True, default=uuid.uuid4)
    vehicle_model_id = Column(Uuid(as_uuid=True), ForeignKey('vehicle_models.id'), nullable=False)
    sender_user_id = Column(Uuid(as_uuid=True), ForeignKey('users.id'), nullable=True)
    sender_email = Column(String, nullable=False)
    message = Column(String, nullable=False)
    created_at = Column(DateTime(timezone=True), nullable=False, server_default=func.now())

class Admin(Base):
    __tablename__ = 'admins'
    id = Column(Uuid(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email = Column(String, unique=True, nullable=False)
    password_hash = Column(String, nullable=False)
    totp_secret_encrypted = Column(LargeBinary, nullable=False)
    is_active = Column(Boolean, nullable=False, default=True)
    created_at = Column(DateTime(timezone=True), nullable=False, server_default=func.now())

class AdminAuditLog(Base):
    __tablename__ = 'admin_audit_log'
    id = Column(Uuid(as_uuid=True), primary_key=True, default=uuid.uuid4)
    admin_id = Column(Uuid(as_uuid=True), ForeignKey('admins.id'), nullable=False)
    action = Column(String, nullable=False)
    target_table = Column(String, nullable=True)
    target_id = Column(Uuid(as_uuid=True), nullable=True)
    metadata_ = Column("metadata", JSON, nullable=True)
    created_at = Column(DateTime(timezone=True), nullable=False, server_default=func.now())
