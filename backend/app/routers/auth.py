from datetime import timedelta
from fastapi import APIRouter, Depends, HTTPException, status, Response, Request
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.database import get_db
from app.models import User, OtpCode, OtpChannel, OtpPurpose
from app.schemas import UserCreate, UserOut, Token, OTPVerify
from app.core.security import get_password_hash, verify_password, create_access_token, ACCESS_TOKEN_EXPIRE_MINUTES
import uuid
from datetime import datetime, timezone

router = APIRouter(prefix="/api/auth", tags=["auth"])

@router.post("/signup", response_model=UserOut)
async def signup(user_data: UserCreate, db: AsyncSession = Depends(get_db)):
    # Check if email exists
    result = await db.execute(select(User).where(User.email == user_data.email))
    if result.scalars().first():
        raise HTTPException(status_code=400, detail="Email already registered")
        
    # Create user
    hashed_password = get_password_hash(user_data.password)
    # Simulate phone encryption for demo
    phone_enc = user_data.phone.encode('utf-8') if user_data.phone else None
    
    new_user = User(
        email=user_data.email,
        password_hash=hashed_password,
        full_name=user_data.full_name,
        phone_encrypted=phone_enc,
        role=user_data.role
    )
    db.add(new_user)
    await db.commit()
    await db.refresh(new_user)
    
    # Simulate OTP generation (Mocking it to '123456')
    otp = OtpCode(
        user_id=new_user.id,
        channel=OtpChannel.email,
        purpose=OtpPurpose.signup,
        code_hash=get_password_hash("123456"), # Demo fixed OTP
        expires_at=datetime.now(timezone.utc) + timedelta(minutes=10)
    )
    db.add(otp)
    await db.commit()
    
    # In a real app, send email/SMS here
    print(f"Mock OTP sent to {new_user.email}: 123456")
    
    return new_user

@router.post("/verify-otp")
async def verify_otp(payload: OTPVerify, request: Request, db: AsyncSession = Depends(get_db)):
    # In a real flow, we'd need a user identifier. 
    # For demo, assume user email is sent or they are partially logged in.
    # Let's simplify by passing user_id in the payload for the demo, or email
    pass # To be completed

from fastapi.security import OAuth2PasswordRequestForm

@router.post("/login")
async def login(response: Response, form_data: OAuth2PasswordRequestForm = Depends(), db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User).where(User.email == form_data.username))
    user = result.scalars().first()
    
    if not user or not verify_password(form_data.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
        
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": str(user.id)}, expires_delta=access_token_expires
    )
    
    # Set httpOnly cookie
    response.set_cookie(
        key="access_token",
        value=f"Bearer {access_token}",
        httponly=True,
        secure=True, 
        samesite="strict",
        max_age=ACCESS_TOKEN_EXPIRE_MINUTES * 60
    )
    
    return {"message": "Successfully logged in"}

@router.post("/logout")
async def logout(response: Response):
    response.delete_cookie("access_token")
    return {"message": "Successfully logged out"}

from app.auth import get_current_user

@router.get("/me", response_model=UserOut)
async def get_me(current_user: User = Depends(get_current_user)):
    return current_user
