# Clutch

Clutch is a white-label coaching platform for gyms and trainers to create, review, and communicate personalized nutrition and workout plans with their clients.

The initial repository foundation is a TypeScript monorepo with:

- `apps/mobile` - React Native client app for end users.
- `apps/admin` - React/Vite web portal prototype for Admin and Coach workflows.
- `packages/shared` - shared Clutch domain models and planning helpers used by both apps.
- `docs/product-brief.md` - requirements-derived product concept, workflow, data inputs, and roadmap notes.

## Core product concept

Clutch combines multiple client data sources into a coach-reviewed plan:

- Genetic test results.
- Blood test biomarkers.
- Wearable summaries from Oura, Apple Watch, Garmin, Fitbit, Whoop, and similar devices.
- Trainer or coach intake notes, goals, constraints, and preferences.

The app does not present generated recommendations as medical advice. The first product shape keeps a coach in the loop: Clutch assembles a plan snapshot and flags opportunities, while trainers approve the final nutrition and training guidance before it reaches the client.

## Getting started

```bash
npm install
npm run typecheck
npm run build
```

Run the admin app:

```bash
npm run dev --workspace apps/admin
```

Run the mobile Metro bundler:

```bash
npm run start --workspace apps/mobile
```

## Repository scripts

- `npm run typecheck` - type-check all workspaces that define a typecheck script.
- `npm run build` - build all workspaces that define a build script.

## Next steps

1. Replace requirements-derived demo data with tenant, coach, client, plan, library, and tracking APIs.
2. Add authentication and role-based access for Admin, Coach, Client, and Partner roles.
3. Connect production integrations for payments, video consultations, push notifications, partner feeds, labs, genetic files, and wearable providers.
4. Split the prototype portal into role-specific Admin and Coach portal routes.
