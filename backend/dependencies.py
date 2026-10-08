"""FastAPI dependencies for authentication and database access."""

from typing import AsyncGenerator, Optional

from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession

from config import settings
from database import async_session_factory


async def get_db() -> AsyncGenerator[AsyncSession, None]:
    """
    Dependency to get database session.

    Provides a database session that auto-commits on success
    and rolls back on exception.

    Usage:
        @router.get("/")
        async def endpoint(db: AsyncSession = Depends(get_db)):
            ...
    """
    async with async_session_factory() as session:
        try:
            yield session
            await session.commit()
        except Exception:
            await session.rollback()
            raise
        finally:
            await session.close()






class ContactServiceDep:
    """Dependency class for ContactService."""

    def __init__(self, db: AsyncSession = Depends(get_db)):
        from services.contact import ContactService
        self.service = ContactService(db)


class NewsletterServiceDep:
    """Dependency class for NewsletterService."""

    def __init__(self, db: AsyncSession = Depends(get_db)):
        from services.contact import NewsletterService
        self.service = NewsletterService(db)
