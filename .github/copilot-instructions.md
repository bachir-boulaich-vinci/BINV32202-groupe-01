# Copilot instructions for Gesta

## Project overview

Gesta is a two-workspace TypeScript application for managing internships:

- `backend/` is an Express 5 API backed by SQLite through `better-sqlite3`.
- `frontend/` is a React 19 application built with Vite.
- The root `package.json` provides shared npm workspace commands.
- In development, Vite serves the UI on port 5173 and proxies `/api/...` to the
  backend on port 3000, removing the `/api` prefix.

The repository is intentionally incomplete: the implemented API and UI are the
reference behavior, while the remaining business requirements are described in
the README and `docs/cdc_gesta_developpement.md`.

## Prerequisites and setup

- Use Node.js `>=22.14.0` (Node 24 LTS is recommended).
- Install the locked dependencies and initialize local configuration/data:

  ```bash
  npm ci
  npm run setup
  ```

- `npm run setup` creates `backend/.env` when needed and initializes
  `backend/data/gesta.db` with demo data.
- Demo authentication is for local development only. It is enabled by
  `DEMO_AUTH_ENABLED=true` and must not be enabled with `NODE_ENV=production`.
- Stop the development server before `npm run db:reset`, especially on Windows,
  because the SQLite file may still be open.

## Build, test, and lint commands

Run these commands from the repository root:

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the backend and frontend together |
| `npm run db:init` | Apply migrations and seed an empty database |
| `npm run db:reset` | Recreate the local database and demo data |
| `npm run lint` | Run Oxlint in both workspaces; warnings fail |
| `npm run typecheck` | Run TypeScript checks in both workspaces |
| `npm test` | Run all backend and frontend Vitest suites |
| `npm run build` | Build both workspaces |
| `npm run check` | Run lint, typecheck, tests, and build |

Targeted tests can be run without invoking the whole workspace suite:

```bash
npm test -w backend -- tests/companies.test.ts
npm test -w frontend -- tests/CompaniesPage.test.tsx
npm test -w backend -- tests/companies.test.ts -t "search"
npm test -w frontend -- tests/CompaniesPage.test.tsx -t "search"
```

Backend tests use Vitest and Supertest with an isolated in-memory SQLite
database. `backend/tests/helpers/testApp.ts` assembles the real application and
`tokenFor(kind, id)` creates a token for seeded users. Frontend tests use
Vitest, jsdom, and Testing Library; `frontend/tests/helpers/fetchMock.ts`
provides API responses.

## Architecture

### Backend request flow

The backend is assembled through factories in `backend/src/app.ts`:

```text
HTTP request
  -> Express routes and middleware
  -> controllers (HTTP parsing/validation)
  -> services (business rules)
  -> repositories (SQL)
  -> SQLite
```

Repositories return database row types. Mappers convert database rows to
domain/DTO shapes. Controllers are responsible for request-specific validation
and status codes; services must not receive Express `Request` or `Response`
objects. Add business rules to services and named permission predicates in
`backend/src/services/permissions.ts`, rather than hiding them in controllers
or the UI.

`authenticate` runs before protected routes, verifies the token, and reloads
the account, roles, and companies from the database on every request.
`authorize(...)` handles 403 decisions. Throw `new HttpError(status, code,
message)` for expected failures; `errorHandler` converts it to the common
JSON shape:

```json
{ "error": { "code": "ERROR_CODE", "message": "..." } }
```

Unexpected errors are logged and returned as `INTERNAL_ERROR`.

### Database and migrations

SQLite foreign keys are enabled for every connection. Migrations in
`backend/src/db/migrations/` are applied once in filename order and tracked in
`schema_migrations`. Schema changes must add a new numbered migration
(`002_....sql`, etc.); never edit an already-applied migration. Database
constraints enforce structural invariants, while service code enforces
business rules and status transitions. Seed data and stable test IDs live in
`backend/src/db/seed/`.

### Frontend request flow

The frontend follows the repository's MVVM-style layering:

```text
pages -> hooks -> services/utils -> models
  \-> reusable components
```

Services call `/api/...`, check HTTP status, and validate JSON with type guards.
Hooks expose display-ready state and call `onUnauthorized` when the API returns
401. `useAuth` is called once in `App.tsx`; the token and logout callback are
passed to pages rather than creating competing session state.

## Repository-specific conventions

- Backend relative imports include the `.ts` extension. TypeScript rewrites
  these to `.js` in the compiled output.
- The `Authorization` header contains the raw signed token, without a
  `Bearer` prefix.
- Use `API_PORT` for the backend port; `PORT` is not the project setting.
- API status and role values are English codes (`PUBLISHED`, `DEPOSITOR`,
  `ARCHIVED`, etc.). Keep French display labels in frontend label helpers.
- Validate external API data with the existing type-guard approach instead of
  trusting TypeScript casts. Reuse `readJson`, `ApiError`, and the existing
  guards where applicable.
- Authorization is a backend responsibility. UI permission helpers may hide
  navigation, but every protected API operation must still authenticate and
  authorize on the server.
- Keep API error responses in the documented `{ error: { code, message } }`
  format and cover relevant 400/401/403/404 cases in backend tests.
- When adding or changing an endpoint, update `backend/API.md` and the
  corresponding `backend/http/*.http` request examples.
- When changing the schema, add a migration and update seed/test fixtures as
  needed. The database seed tests enforce relationships such as contact roles,
  company links, and offer/application/internship consistency.
- For a cross-layer feature, follow the existing companies or offers vertical
  slices: controller, service, repository, model/mapper, backend tests, then
  frontend service, hook, page/component, and UI tests.
- Keep demo users and their behavior consistent with `docs/seed.md`; demo
  credentials are identities only, not real authentication.
- Pull requests use the repository template in
  `.github/pull_request_template.md`: include the requirement/issue, describe
  changes by layer, record the exact verification performed, update API/HTTP
  docs for API changes, and include the required exported conversation record
  under `docs/`.

Pour tout ajout de fonctionnalité ou correction de bug, lis et applique
.github/skills/test-driven-development/SKILL.md avant de modifier le code
de l’application. Écris et exécute les tests d’abord, présente-les, puis attends
leur validation explicite avant l’implémentation. Cette règle ne concerne pas les
demandes d’explication ou de documentation seules.
