# Create A International Corporate

Full-stack web application: Next.js frontend, FastAPI backend, PostgreSQL, all behind an nginx gateway on a single port.

## Run it

```bash
docker compose up --build
```

Open http://localhost:21631 — the frontend is at `/`, the API at `/api`, interactive API docs at `/api/docs`.

Configuration lives in `.env` (generated with real secrets at scaffold time; see `.env.example` for the full list).

## What's inside

| Piece | Where | Notes |
|---|---|---|
| Frontend | `frontend/` | Next.js App Router, Tailwind CSS, Framer Motion |
| Backend | `backend/` | FastAPI, async SQLAlchemy, Alembic migrations |
| Database | `database/` | PostgreSQL 16, init scripts |
| Gateway | `nginx/` | Routes `/` → frontend, `/api` → backend |

The site opens as a **waiting screen** — the project's brand on a single viewport with an ambient build pulse, a real API health check, and a launch-notify email capture that writes to the database. Behind it sits a full section kit (hero, features, FAQ, contact, newsletter) ready to compose the real landing page: swap `<Waiting />` in `app/page.tsx` for sections, edit the copy in `frontend/content/site.ts`, and retheme via the tokens in `frontend/tailwind.config.js`.

Features: contact form and newsletter signup (stored in the database)

## Everyday commands

```bash
docker compose logs -f backend      # follow one service's logs
docker compose exec backend alembic upgrade head        # run migrations
docker compose exec backend alembic revision --autogenerate -m "add table"
docker compose down                 # stop
docker compose down -v              # stop and wipe the database
```

## Deploying

`docker-compose.prod.yml` builds the production targets (standalone Next.js, gunicorn) with no bind mounts and no published ports — it is designed to run behind a Traefik reverse proxy and is what the deployment pipeline uses. `docker-compose.staging.yml` layers the gateway-port publish on top for staging.
