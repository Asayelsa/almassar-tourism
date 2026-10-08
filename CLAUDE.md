# Create A International Corporate

> AI Agent Guidance File - This file provides context for AI assistants working on this codebase.

## Overview

Full-stack application scaffold. **The deployed default is a waiting screen**
(`components/sections/waiting.tsx`) — the owner's brand holding the address
while their real product is built. Your first job when building the product:
replace `<Waiting />` in `app/page.tsx` with a composition from the section
kit (Header, Hero, Features, Faq, Contact, Newsletter, Footer under
`components/sections/`), rewrite `content/site.ts` with the owner's real
copy, and retheme via the tokens in `tailwind.config.js` if the brand calls
for it. Keep the launch-notify emails — they are in the newsletter table.

## Tech Stack

- **Frontend**: Next.js 15 with App Router
- **Backend**: FastAPI with async SQLAlchemy
- **Database**: PostgreSQL 16
- **Container**: Docker + Docker Compose
- **Proxy**: Nginx (routes `/` to frontend, `/api` to backend)
- **Styling**: Tailwind CSS + Framer Motion

## How This Project Runs

Two stacks, and they are **not** interchangeable:

| | File | Build | Where it runs |
|---|---|---|---|
| **Preview / staging** | `docker-compose.staging.yml` | production — `next build`, standalone server, no bind mounts | the server; this is what people actually see |
| **Local development** | `docker-compose.yml` | dev server, bind mounts, hot reload | your machine only |

```bash
# Rebuild the preview after changing code — there is NO hot reload here
docker compose -f docker-compose.staging.yml up -d --build

# Inspect the preview
docker compose -f docker-compose.staging.yml ps
docker compose -f docker-compose.staging.yml logs -f frontend
```

**The deployed preview does not hot-reload.** It runs the production build, so
every code change needs the rebuild above before it is visible — expect tens of
seconds, not instant. This is deliberate: a `next dev` preview held 0.5-4 GB of
RAM and kept growing for as long as it stayed up, against ~40 MB for the
standalone server, and previews are long-lived and mostly idle.

The `docker compose ...` commands below (no `-f`) act on the **local dev**
stack. Use them while developing; use the staging file for anything the server
is meant to serve.

## Quick Commands

```bash
# Start all services (with build)
docker compose up --build

# Start in detached mode
docker compose up -d --build

# View logs
docker compose logs -f

# View specific service logs
docker compose logs -f frontend
docker compose logs -f backend

# Stop all services
docker compose down

# Clean up (remove volumes)
docker compose down -v
```

## Database Migrations

```bash
# Run pending migrations
docker compose exec backend alembic upgrade head

# Create new migration
docker compose exec backend alembic revision --autogenerate -m "description"

# Show migration history
docker compose exec backend alembic history

# Rollback last migration
docker compose exec backend alembic downgrade -1
```

## Project Structure

```
Create A International Corporate/
├── frontend/              # Next.js application
│   ├── Dockerfile
│   ├── app/               # App Router pages (page.tsx composes the landing page)
│   ├── content/site.ts    # ALL page copy (waiting screen + section kit) — edit to re-brand
│   ├── components/
│   │   ├── sections/      # Header, Hero, Features, Faq, Contact, Newsletter, Footer
│   │   └── ui/            # Button, Input, Textarea, Label
│   ├── context/           # React contexts
│   └── lib/               # API client (lib/api.ts) and utilities
├── backend/               # FastAPI application
│   ├── Dockerfile
│   ├── main.py            # FastAPI app + router wiring
│   ├── config.py          # Settings from environment variables
│   ├── database.py        # Async engine + session factory
│   ├── dependencies.py    # FastAPI dependencies (get_db, ...)
│   ├── models/            # SQLAlchemy models
│   ├── schemas/           # Pydantic request/response schemas
│   ├── services/          # Business logic
│   ├── routes/            # API routes
│   └── migrations/        # Alembic migrations
├── database/              # Database init scripts
├── nginx/                 # Reverse proxy config
├── docker-compose.yml     # LOCAL development only (hot reload, bind mounts)
├── docker-compose.staging.yml  # Preview/staging — production build on the gateway port (what the server runs)
├── docker-compose.prod.yml     # Production behind Traefik (Host() routing + TLS)
└── .env                   # Environment variables (secrets — never commit)
```

## API Endpoints

All API endpoints are accessible at `http://localhost:21631/api/`

### Health
- `GET /health` - Health check


### Contact
- `POST /contact` - Submit contact form

### Newsletter
- `POST /newsletter/subscribe` - Subscribe to newsletter
- `POST /newsletter/unsubscribe` - Unsubscribe

## Environment Variables

```bash
# Database
DB_NAME=app_db
DB_USER=app_user
DB_PASSWORD=<secure_password>


# Application
SITE_NAME=Create A International Corporate
GATEWAY_PORT=21631
CORS_ORIGINS=http://localhost:21631
```


## Coding Standards

### Frontend
- Use TypeScript with strict mode
- Components in PascalCase
- Utilities in camelCase
- Use Tailwind for styling
- Prefer Server Components, use 'use client' only when needed
- Call the backend through `lib/api.ts` (`submitContact`, `subscribeNewsletter`, ...) — do not fetch directly from components
- Landing-page copy lives in `content/site.ts`; section components render from it. To re-brand: edit that file and the design tokens (`paper`, `ink`, `accent`) in `tailwind.config.js` — changing the accent hex restyles every button, link and mark at once
- Display face is Bricolage Grotesque (`font-display`), body is Inter, `font-mono` (JetBrains Mono) is the utility voice for eyebrows and the live status strip

### Backend
- Use type hints everywhere
- Async functions for database operations
- Pydantic for validation
- New endpoints: model in `models/`, schema in `schemas/`, logic in `services/`, route in `routes/`, wired in `main.py` — follow the contact feature as the reference
- Schema changes always get an Alembic migration

## Development Tips

1. **Hot Reload**: local dev only (`docker-compose.yml`). The deployed preview runs the production build — rebuild it with `docker compose -f docker-compose.staging.yml up -d --build`
2. **Database Changes**: Always create migrations for schema changes
3. **API Testing**: Use `/api/docs` for interactive API documentation
4. **Styling**: Use the existing Tailwind classes and component patterns

---

*Generated with Boilerplate MCP Server*
