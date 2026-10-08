"""Contact submission routes."""

from typing import Annotated, List, Optional
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Request, status, Query
from sqlalchemy.ext.asyncio import AsyncSession

from dependencies import get_db
from models.contact import ContactStatus
from schemas import (
    ContactSubmissionCreate,
    ContactSubmissionResponse,
    ContactSubmissionUpdate,
    ContactSubmissionListResponse,
    PaginatedResponse,
    PaginationParams,
    MessageResponse,
)
from services import ContactService

router = APIRouter()


@router.post(
    "",
    response_model=MessageResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Submit contact form",
    description="Submit a contact form inquiry. No authentication required.",
)
async def submit_contact(
    contact_data: ContactSubmissionCreate,
    request: Request,
    db: AsyncSession = Depends(get_db),
):
    """
    Submit a contact form.

    Captures the sender's name, email, optional company, and message.
    Also stores IP address and user agent for spam prevention.
    """
    contact_service = ContactService(db)

    # Get client metadata for spam prevention
    ip_address = request.client.host if request.client else None
    user_agent = request.headers.get("user-agent")

    await contact_service.create(
        contact_data,
        ip_address=ip_address,
        user_agent=user_agent,
    )

    return MessageResponse(message="Contact form submitted successfully")


# Admin management endpoints — only meaningful when authentication exists.
