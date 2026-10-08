"""Newsletter subscription routes."""

from typing import Annotated, List, Optional
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Request, status, Query
from sqlalchemy.ext.asyncio import AsyncSession

from dependencies import get_db
from schemas import (
    NewsletterSubscribeRequest,
    NewsletterUnsubscribeRequest,
    NewsletterSubscriberResponse,
    NewsletterSubscriberListResponse,
    MessageResponse,
)
from services import NewsletterService

router = APIRouter()


@router.post(
    "/subscribe",
    response_model=MessageResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Subscribe to newsletter",
    description="Subscribe an email address to the newsletter.",
)
async def subscribe(
    data: NewsletterSubscribeRequest,
    request: Request,
    db: AsyncSession = Depends(get_db),
):
    """
    Subscribe to the newsletter.

    If the email is already subscribed, returns success.
    If previously unsubscribed, reactivates the subscription.
    """
    newsletter_service = NewsletterService(db)

    # Get IP address for tracking
    ip_address = request.client.host if request.client else None

    subscriber = await newsletter_service.subscribe(data, ip_address=ip_address)

    if subscriber.unsubscribed_at is None:
        return MessageResponse(message="Successfully subscribed to newsletter")
    else:
        return MessageResponse(message="Subscription reactivated")


@router.post(
    "/unsubscribe",
    response_model=MessageResponse,
    summary="Unsubscribe from newsletter",
    description="Unsubscribe an email address from the newsletter.",
)
async def unsubscribe(
    data: NewsletterUnsubscribeRequest,
    db: AsyncSession = Depends(get_db),
):
    """Unsubscribe from the newsletter."""
    newsletter_service = NewsletterService(db)
    subscriber = await newsletter_service.unsubscribe(data.email)

    if not subscriber:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Email not found in subscribers",
        )

    return MessageResponse(message="Successfully unsubscribed from newsletter")


# Admin management endpoints — only meaningful when authentication exists.
