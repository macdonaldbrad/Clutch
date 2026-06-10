# Clutch product brief

## Vision

Clutch is a white-label platform that gyms, trainers, and coaching teams can brand as their own client experience. It helps coaches turn genetics, bloodwork, wearable trends, and intake conversations into personalized nutrition and workout plans.

## Primary users

- Gym owners and operators who need branded programming infrastructure.
- Trainers and coaches who create and adjust client plans.
- Clients who receive plans, check-ins, progress updates, and coaching messages.
- Clutch operators who configure tenants, integrations, and review workflows.

## Core workflow

1. A gym or trainer creates a white-label tenant in the admin module.
2. The coach invites a client and completes the intake process.
3. The client connects wearable data and uploads or authorizes test results.
4. Clutch normalizes available inputs into a shared client profile.
5. The plan engine generates nutrition and training recommendations with source attribution.
6. The coach reviews safety notes, edits the plan, and approves publication.
7. The mobile app communicates the plan, weekly focus, and coach touchpoints to the client.

## Data inputs

### Genetic test

Genetic findings should be modeled as coaching context, not deterministic prescriptions. Examples include satiety tendencies, recovery considerations, caffeine metabolism, or training response markers.

### Blood tests

Bloodwork should be displayed with units, ranges, status, and a coach-safe implication. Any clinical interpretation should be presented as a prompt to consult an appropriate healthcare professional.

### Wearables

Initial supported providers:

- Oura Ring.
- Apple Watch.
- Garmin.
- Fitbit.
- Whoop.
- Manual entry or CSV fallback.

Useful planning fields include readiness, sleep, resting heart rate, HRV trend, training load, recovery, and activity consistency.

### Coach intake

The intake process captures goals, constraints, nutrition preferences, dietary restrictions, injury considerations, schedule, equipment access, training age, and coach notes.

## Product guardrails

- Keep a coach in the loop before publishing personalized recommendations.
- Attribute recommendations to the data sources that influenced them.
- Separate coaching guidance from diagnosis or treatment.
- Build tenant branding into the platform from the start.
- Treat health data as sensitive by default.

## Initial repository implementation

This first implementation creates:

- A shared TypeScript domain package for tenant, intake, biomarker, wearable, and plan objects.
- A deterministic demo plan snapshot helper.
- A React web admin module that shows coach review and data-source context.
- An Expo mobile app that shows the client-facing plan summary.

## Near-term technical roadmap

1. Add authentication, tenant isolation, and role-based permissions.
2. Add persistent API and database models for tenants, clients, imports, and plans.
3. Build intake form flows for coaches and clients.
4. Add integration adapters for wearables and lab/genetic data vendors.
5. Add plan review, approval, versioning, and publication states.
6. Add audit logs and privacy controls for sensitive health data.
