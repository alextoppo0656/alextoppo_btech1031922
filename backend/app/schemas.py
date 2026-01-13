from pydantic import BaseModel, EmailStr, Field
from datetime import datetime
from typing import Optional
from enum import Enum

class TaskStatus(str, Enum):
    pending = "pending"
    in_progress = "in-progress"
    completed = "completed"

# User schemas
class UserBase(BaseModel):
    email: EmailStr
    username: str

class UserCreate(UserBase):
    password: str = Field(..., min_length=6)

class UserUpdate(BaseModel):
    email: Optional[EmailStr] = None
    username: Optional[str] = None
    password: Optional[str] = Field(None, min_length=6)

class User(UserBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

# Task schemas
class TaskBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=200)
    description: Optional[str] = ""
    status: Optional[TaskStatus] = TaskStatus.pending
    due_date: Optional[datetime] = None

class TaskCreate(TaskBase):
    pass

class TaskUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=1, max_length=200)
    description: Optional[str] = None
    status: Optional[TaskStatus] = None
    due_date: Optional[datetime] = None

class Task(TaskBase):
    id: int
    created_at: datetime
    user_id: int

    class Config:
        from_attributes = True

# Auth schemas
class Token(BaseModel):
    access_token: str
    token_type: str

class LoginRequest(BaseModel):
    email: EmailStr
    password: str
