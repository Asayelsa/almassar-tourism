# syntax=docker/dockerfile:1

# =============================================================================
# Wheels — compile once, with a compiler present.
# =============================================================================
# The production stage used to pip install directly without gcc, so any
# dependency without a prebuilt wheel failed there while succeeding in dev.
# Building wheels here means production installs binaries only.
FROM python:3.12-slim AS wheels

WORKDIR /wheels

RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc libpq-dev \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .

RUN --mount=type=cache,target=/root/.cache/pip \
    pip wheel --wheel-dir /wheels -r requirements.txt gunicorn

# =============================================================================
# Base — runtime libraries and the non-root user, shared by both stages.
# =============================================================================
FROM python:3.12-slim AS base

ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1

WORKDIR /app

# libpq5 is the runtime library. libpq-dev is headers for compiling against it
# and has no business in a running container.
RUN apt-get update && apt-get install -y --no-install-recommends \
    libpq5 curl \
    && rm -rf /var/lib/apt/lists/*

RUN addgroup --system --gid 1001 appgroup \
    && adduser --system --uid 1001 --gid 1001 appuser

# =============================================================================
# Development — hot reload.
# =============================================================================
FROM base AS development

COPY requirements.txt .

RUN --mount=type=cache,target=/root/.cache/pip \
    --mount=from=wheels,source=/wheels,target=/wheels \
    pip install --no-index --find-links=/wheels -r requirements.txt

COPY --chown=appuser:appgroup . .

USER appuser

EXPOSE 8000

HEALTHCHECK --interval=15s --timeout=10s --start-period=60s --retries=5 \
    CMD curl -f http://127.0.0.1:8000/health || exit 1

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]

# =============================================================================
# Production
# =============================================================================
FROM base AS production

COPY requirements.txt .

RUN --mount=from=wheels,source=/wheels,target=/wheels \
    pip install --no-index --find-links=/wheels -r requirements.txt gunicorn

COPY --chown=appuser:appgroup . .

USER appuser

EXPOSE 8000

HEALTHCHECK --interval=15s --timeout=10s --start-period=60s --retries=5 \
    CMD curl -f http://127.0.0.1:8000/health || exit 1

CMD ["gunicorn", "-w", "4", "-k", "uvicorn.workers.UvicornWorker", "main:app", "-b", "0.0.0.0:8000"]
