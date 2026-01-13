from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from .. import models, schemas, auth
from ..database import get_db
from ..dependencies import get_current_user

router = APIRouter(prefix="/users", tags=["users"])

@router.get("/me", response_model=schemas.User)
def get_current_user_profile(current_user: models.User = Depends(get_current_user)):
    return current_user

@router.put("/me", response_model=schemas.User)
def update_user_profile(
    user_update: schemas.UserUpdate,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # Check if email is being changed and if it's already taken
    if user_update.email and user_update.email != current_user.email:
        existing_email = db.query(models.User).filter(
            models.User.email == user_update.email,
            models.User.id != current_user.id
        ).first()
        if existing_email:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already in use"
            )
        current_user.email = user_update.email
    
    # Check if username is being changed and if it's already taken
    if user_update.username and user_update.username != current_user.username:
        existing_username = db.query(models.User).filter(
            models.User.username == user_update.username,
            models.User.id != current_user.id
        ).first()
        if existing_username:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Username already taken"
            )
        current_user.username = user_update.username
    
    # Update password if provided
    if user_update.password:
        current_user.hashed_password = auth.get_password_hash(user_update.password)
    
    db.commit()
    db.refresh(current_user)
    
    return current_user

@router.delete("/me", status_code=status.HTTP_204_NO_CONTENT)
def delete_user_account(
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    db.delete(current_user)
    db.commit()
    return None
