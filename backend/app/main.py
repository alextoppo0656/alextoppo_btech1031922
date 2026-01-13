from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from .database import engine, Base
from .routers import auth, users, tasks

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Task Management API",
    description="A RESTful API for managing tasks with Kanban board functionality",
    version="1.0.0"
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:3000",
        "https://*.vercel.app",  # Allow all Vercel preview URLs
        "https://alextoppo-btech1031922.vercel.app/"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Exception handlers
@app.exception_handler(HTTPException)
async def http_exception_handler(request, exc):
    return JSONResponse(
        status_code=exc.status_code,
        content={"detail": exc.detail}
    )

@app.exception_handler(Exception)
async def general_exception_handler(request, exc):
    return JSONResponse(
        status_code=500,
        content={"detail": "An unexpected error occurred"}
    )

# Include routers
app.include_router(auth.router)
app.include_router(users.router)
app.include_router(tasks.router)

@app.get("/")
def root():
    return {
        "message": "Task Management API",
        "docs": "/docs",
        "version": "1.0.0"
    }

@app.get("/health")
def health_check():
    return {"status": "healthy"}
