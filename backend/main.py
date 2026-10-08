"""Main FastAPI application for starter landing page."""

from contextlib import asynccontextmanager
from typing import AsyncGenerator

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from config import settings
from database import engine
from routes.health import router as health_router
from routes.contact import router as contact_router
from routes.newsletter import router as newsletter_router


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncGenerator[None, None]:
    """
    Application lifespan manager.

    Handles startup and shutdown events.
    """
    # Startup
    print("Starting application...")


    yield

    # Shutdown
    print("Shutting down application...")
    await engine.dispose()


# Create FastAPI application
app = FastAPI(
    title="42d6f3fc-6853-4abf-a5bf-9e132af66c77 API",
    description="Backend API for 42d6f3fc-6853-4abf-a5bf-9e132af66c77 landing page",
    version="1.0.0",
    lifespan=lifespan,
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url="/openapi.json",
)


# CORS middleware configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Include API routers
app.include_router(
    health_router,
    tags=["health"],
)
app.include_router(
    contact_router,
    prefix="/contact",
    tags=["contact"],
)
app.include_router(
    newsletter_router,
    prefix="/newsletter",
    tags=["newsletter"],
)


@app.get("/", tags=["root"])
async def root():
    """API root endpoint."""
    return {
        "name": "42d6f3fc-6853-4abf-a5bf-9e132af66c77 API",
        "version": "1.0.0",
        "status": "running",
        "docs": "/docs",
    }
