from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from typing import Optional, List
from .. import models, schemas
from ..database import get_db
from ..dependencies import get_current_user

router = APIRouter(prefix="/tasks", tags=["tasks"])

@router.post("", response_model=schemas.Task, status_code=status.HTTP_201_CREATED)
def create_task(
    task_data: schemas.TaskCreate,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    new_task = models.Task(
        **task_data.model_dump(),
        user_id=current_user.id
    )
    
    db.add(new_task)
    db.commit()
    db.refresh(new_task)
    
    return new_task

@router.get("", response_model=List[schemas.Task])
def get_tasks(
    status: Optional[str] = Query(None, description="Filter by status: pending, in-progress, or completed"),
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    query = db.query(models.Task).filter(models.Task.user_id == current_user.id)
    
    if status:
        # Validate status
        valid_statuses = ["pending", "in-progress", "completed"]
        if status not in valid_statuses:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Invalid status. Must be one of: {', '.join(valid_statuses)}"
            )
        query = query.filter(models.Task.status == status)
    
    tasks = query.order_by(models.Task.created_at.desc()).all()
    return tasks

@router.get("/{task_id}", response_model=schemas.Task)
def get_task(
    task_id: int,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    task = db.query(models.Task).filter(
        models.Task.id == task_id,
        models.Task.user_id == current_user.id
    ).first()
    
    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found"
        )
    
    return task

@router.put("/{task_id}", response_model=schemas.Task)
def update_task(
    task_id: int,
    task_update: schemas.TaskUpdate,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    task = db.query(models.Task).filter(
        models.Task.id == task_id,
        models.Task.user_id == current_user.id
    ).first()
    
    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found"
        )
    
    # Update only provided fields
    update_data = task_update.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(task, field, value)
    
    db.commit()
    db.refresh(task)
    
    return task

@router.patch("/{task_id}", response_model=schemas.Task)
def partial_update_task(
    task_id: int,
    task_update: schemas.TaskUpdate,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # Same as PUT for this implementation
    return update_task(task_id, task_update, current_user, db)

@router.delete("/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_task(
    task_id: int,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    task = db.query(models.Task).filter(
        models.Task.id == task_id,
        models.Task.user_id == current_user.id
    ).first()
    
    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found"
        )
    
    db.delete(task)
    db.commit()
    
    return None
