"""Contact and Newsletter service for business logic."""

from datetime import datetime
from typing import Optional, List
from uuid import UUID

from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession

from models.contact import (
    ContactSubmission,
    ContactStatus,
    NewsletterSubscriber,
    SubscriptionSource,
)
from schemas.contact import (
    ContactSubmissionCreate,
    ContactSubmissionUpdate,
    NewsletterSubscribeRequest,
)


class ContactService:
    """Service class for contact submission operations."""

    def __init__(self, db: AsyncSession):
        """Initialize with database session."""
        self.db = db

    async def get_by_id(self, submission_id: UUID) -> Optional[ContactSubmission]:
        """Get submission by ID."""
        result = await self.db.execute(
            select(ContactSubmission).where(ContactSubmission.id == submission_id)
        )
        return result.scalar_one_or_none()

    async def get_all(
        self,
        *,
        skip: int = 0,
        limit: int = 100,
        status: Optional[str] = None,
    ) -> List[ContactSubmission]:
        """Get all submissions with optional filtering."""
        query = select(ContactSubmission)

        if status is not None:
            # Handle both enum and string
            status_value = status.value if hasattr(status, 'value') else status
            query = query.where(ContactSubmission.status == status_value)

        query = query.order_by(ContactSubmission.created_at.desc())
        query = query.offset(skip).limit(limit)

        result = await self.db.execute(query)
        return list(result.scalars().all())

    async def get_count(self, *, status: Optional[str] = None) -> int:
        """Get total submission count."""
        query = select(func.count(ContactSubmission.id))

        if status is not None:
            status_value = status.value if hasattr(status, 'value') else status
            query = query.where(ContactSubmission.status == status_value)

        result = await self.db.execute(query)
        return result.scalar_one()

    async def get_unread_count(self) -> int:
        """Get count of unread (NEW) submissions."""
        return await self.get_count(status="new")

    async def create(
        self,
        data: ContactSubmissionCreate,
        *,
        ip_address: Optional[str] = None,
        user_agent: Optional[str] = None,
    ) -> ContactSubmission:
        """Create a new contact submission."""
        submission = ContactSubmission(
            name=data.name,
            email=data.email.lower(),
            message=data.message,
            company=data.company,
            subject=data.subject,
            status="new",
            ip_address=ip_address,
            user_agent=user_agent,
        )
        self.db.add(submission)
        await self.db.flush()
        await self.db.refresh(submission)
        return submission

    async def update(
        self,
        submission: ContactSubmission,
        data: ContactSubmissionUpdate,
    ) -> ContactSubmission:
        """Update a submission (admin only)."""
        update_data = data.model_dump(exclude_unset=True)

        for field, value in update_data.items():
            setattr(submission, field, value)

        await self.db.flush()
        await self.db.refresh(submission)
        return submission

    async def mark_as_read(self, submission: ContactSubmission) -> ContactSubmission:
        """Mark submission as read."""
        submission.status = "read"
        await self.db.flush()
        return submission

    async def mark_as_replied(self, submission: ContactSubmission) -> ContactSubmission:
        """Mark submission as replied."""
        submission.status = "replied"
        await self.db.flush()
        return submission

    async def archive(self, submission: ContactSubmission) -> ContactSubmission:
        """Archive a submission."""
        submission.status = "archived"
        await self.db.flush()
        return submission

    async def delete(self, submission: ContactSubmission) -> None:
        """Delete a submission (hard delete)."""
        await self.db.delete(submission)
        await self.db.flush()


class NewsletterService:
    """Service class for newsletter subscription operations."""

    def __init__(self, db: AsyncSession):
        """Initialize with database session."""
        self.db = db

    async def get_by_id(self, subscriber_id: UUID) -> Optional[NewsletterSubscriber]:
        """Get subscriber by ID."""
        result = await self.db.execute(
            select(NewsletterSubscriber).where(NewsletterSubscriber.id == subscriber_id)
        )
        return result.scalar_one_or_none()

    async def get_by_email(self, email: str) -> Optional[NewsletterSubscriber]:
        """Get subscriber by email."""
        result = await self.db.execute(
            select(NewsletterSubscriber).where(
                NewsletterSubscriber.email == email.lower()
            )
        )
        return result.scalar_one_or_none()

    async def get_all(
        self,
        *,
        skip: int = 0,
        limit: int = 100,
        is_active: Optional[bool] = None,
    ) -> List[NewsletterSubscriber]:
        """Get all subscribers with optional filtering."""
        query = select(NewsletterSubscriber)

        if is_active is not None:
            query = query.where(NewsletterSubscriber.is_active == is_active)

        query = query.order_by(NewsletterSubscriber.subscribed_at.desc())
        query = query.offset(skip).limit(limit)

        result = await self.db.execute(query)
        return list(result.scalars().all())

    async def get_count(self, *, is_active: Optional[bool] = None) -> int:
        """Get total subscriber count."""
        query = select(func.count(NewsletterSubscriber.id))

        if is_active is not None:
            query = query.where(NewsletterSubscriber.is_active == is_active)

        result = await self.db.execute(query)
        return result.scalar_one()

    async def get_active_count(self) -> int:
        """Get count of active subscribers."""
        return await self.get_count(is_active=True)

    async def subscribe(
        self,
        data: NewsletterSubscribeRequest,
        *,
        ip_address: Optional[str] = None,
    ) -> NewsletterSubscriber:
        """
        Subscribe an email to the newsletter.

        If already subscribed (active), returns existing subscriber.
        If previously unsubscribed, reactivates the subscription.
        """
        existing = await self.get_by_email(data.email)

        if existing:
            if existing.is_active:
                return existing

            # Reactivate subscription
            existing.resubscribe()
            # Handle both enum and string for source
            existing.source = data.source.value if hasattr(data.source, 'value') else data.source
            existing.ip_address = ip_address
            await self.db.flush()
            await self.db.refresh(existing)
            return existing

        # Create new subscriber
        source_value = data.source.value if hasattr(data.source, 'value') else data.source
        subscriber = NewsletterSubscriber(
            email=data.email.lower(),
            is_active=True,
            source=source_value,
            subscribed_at=datetime.utcnow(),
            ip_address=ip_address,
        )
        self.db.add(subscriber)
        await self.db.flush()
        await self.db.refresh(subscriber)
        return subscriber

    async def unsubscribe(self, email: str) -> Optional[NewsletterSubscriber]:
        """
        Unsubscribe an email from the newsletter.

        Returns the subscriber if found, None if email not found.
        """
        subscriber = await self.get_by_email(email)
        if not subscriber:
            return None

        if subscriber.is_active:
            subscriber.unsubscribe()
            await self.db.flush()

        return subscriber

    async def delete(self, subscriber: NewsletterSubscriber) -> None:
        """Delete a subscriber (hard delete for GDPR compliance)."""
        await self.db.delete(subscriber)
        await self.db.flush()

    async def export_active_emails(self) -> List[str]:
        """Export all active subscriber emails."""
        result = await self.db.execute(
            select(NewsletterSubscriber.email).where(
                NewsletterSubscriber.is_active == True
            )
        )
        return list(result.scalars().all())
