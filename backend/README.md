# Task Management System - Backend

RESTful API built with FastAPI for managing tasks with user authentication.

## Tech Stack

- FastAPI - Modern Python web framework
- SQLAlchemy - ORM for database operations
- SQLite - Lightweight database
- JWT - Token-based authentication
- Pydantic - Data validation

## Setup Instructions

### Prerequisites

- Python 3.8 or higher
- pip package manager

### Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Configure environment variables:

Create & Edit `.env` as:
```
SECRET_KEY=your-super-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_DAYS=7
DATABASE_URL=sqlite:///./tasks.db
```

### Running the Server

Start the development server:
```bash
uvicorn app.main:app --reload
```

The API will be available at `http://localhost:8000`

API documentation: `http://localhost:8000/docs`

## API Endpoints

### Authentication

- `POST /auth/signup` - Create new user account
- `POST /auth/login` - Login and receive JWT token

### Users

- `GET /users/me` - Get current user profile
- `PUT /users/me` - Update user profile
- `DELETE /users/me` - Delete user account

### Tasks

- `POST /tasks` - Create a new task
- `GET /tasks` - Get all user tasks (supports ?status=pending filter)
- `GET /tasks/{id}` - Get specific task
- `PUT /tasks/{id}` - Update task
- `PATCH /tasks/{id}` - Partial update (for drag-drop)
- `DELETE /tasks/{id}` - Delete task

## Database Schema

### Users
- id (Primary Key)
- email (Unique)
- username (Unique)
- hashed_password
- created_at

### Tasks
- id (Primary Key)
- title
- description
- status (pending/in-progress/completed)
- due_date
- created_at
- user_id (Foreign Key)

## Authentication Flow

1. User signs up with email, username, and password
2. Password is hashed using bcrypt
3. On login, server validates credentials and returns JWT token
4. Client includes token in Authorization header: `Bearer <token>`
5. Token expires after 7 days (configurable)

## Error Handling

The API returns appropriate HTTP status codes:
- 200: Success
- 201: Created
- 204: No Content (for deletes)
- 400: Bad Request (validation errors)
- 401: Unauthorized
- 404: Not Found
- 500: Internal Server Error

Error responses include a detail message:
```json
{
  "detail": "Error message here"
}
```
