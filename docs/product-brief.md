# Clutch product brief

Source: uploaded `Clutch_App_Requirements_v4_16f2.pdf`.

## Vision

Clutch is a white-label training technology platform for gyms, personal trainers, and fitness professionals. It combines coach-authored programming, daily client tracking, meal planning, communication, partner data feeds, and personalized health inputs into one mobile client experience and supporting web portals.

The unique personalization layer uses:

- Genetic test context.
- Blood test biomarkers.
- Wearable and health data from Oura, Apple Watch, Garmin, Fitbit, Whoop, Apple Health, Google Health, and similar providers.
- Coach/client intake, goals, constraints, and preferences.

## Primary roles

- **Admins:** Clutch administrators who manage coaches, feature access, white-label configuration, exercise libraries, meal libraries, ingredients, partner feeds, and coach emulation.
- **Coaches:** Trainers, gyms, and fitness professionals who create client profiles, programs, workouts, meal plans, lifestyle recommendations, communications, subscriptions, and progress reviews.
- **Clients:** End users who consume daily plans, execute workouts, prepare meals, complete lifestyle tasks, track results, communicate with coaches, and manage account preferences.
- **Partners:** External systems that submit or sync content and data through APIs and batch feeds.

## Required user experiences

### Mobile app

Clients use the mobile app for:

- A daily dashboard with coach messages, scheduled workouts, meal plans, lifestyle tasks, result prompts, and meetings.
- Workout execution with play, pause, rewind, skip, restart, text guidance, and text-to-audio prompts.
- Workout editing when a coach has not locked the assigned workout.
- Client-created workouts from the exercise library.
- Meal viewing, serving adjustment, completion, favorites, and client-created meal plans.
- Shopping list generation across a future meal date range.
- Lifestyle recommendation completion and comments.
- Daily calendar tracking for past results and future planning.
- Progress tracking with photos, body measurements, fitness stats, goals, overdue reminders, and analytics.
- Real-time messaging, attachments, push notifications, video consultations, and meeting reminders.
- Exercise and meal library browsing.
- Account settings, device connections, preferred units, terms, privacy, subscriptions, and payments.

### Coach portal

Coaches use the portal for:

- Professional and gym profile management, including branding, colors, fonts, logos, certifications, photos, hours, and contact details.
- Client invitations, profile management, suspension/deletion, and subscription visibility.
- A visible "current client" selector while assigning plans or reviewing logs.
- Client workout, nutrition, lifestyle, and metrics reports.
- Workout creation, assignment, alternate workouts, bulk CSV upload, bulk edit, trainer-uploaded videos, and multi-week workout programs.
- Meal plan creation, alternate meals, assignment, meal plan programs, and meal notes.
- Lifestyle recommendations with date ranges and assigned days.
- Direct messaging, bulk announcements, client segments, video consultations, triggered communications, and personalized message placeholders.

### Admin portal

Admins use the portal for:

- Coach profile administration, account activation, suspension, deletion, subscription management, feature enablement, and coach emulation.
- Exercise library administration including add, edit, remove, instructional media, category tags, body focus tags, equipment, and difficulty.
- Meal library administration including add, edit, remove, media, instructions, ingredients, meal variations, and nutritional variants.
- Ingredient database administration including nutrition information.

### Partner connectors and data feeds

Partner integrations include:

- Bulk workout, meal, and lifestyle assignment imports keyed by client ID and future dates.
- JSON payload support for client assignments, workout IDs, meal IDs, lifestyle recommendations, and coach notes.
- Apple Health, Google Health, Garmin, and other health/wearable connections.
- Real-time interaction and batch transfer patterns.

## Domain model highlights

The requirements establish these core content relationships:

- A daily training plan has one or more workouts.
- A workout has exercises and rests, ordered as steps.
- Exercises include instructional media, tags, equipment, difficulty, and client favorites.
- A daily meal plan has one or more meals.
- Meals include ingredients, instructions, preparation time, media, nutrition data, serving adjustments, and client favorites.
- Lifestyle plans include recommendations, date ranges, assigned days, completion status, and comments.
- Tracking prompts include photos, numeric measurements, goals, intervals, overdue reminders, and analytics.
- Programs collect workouts or meal plans over relative days for later assignment.

## Product guardrails

- Keep coach control for locked workouts and coach-assigned plans.
- Attribute personalized recommendations to the data sources that influenced them.
- Separate coaching guidance from diagnosis or treatment.
- Treat health, payment, and identity data as sensitive by default.
- Build tenant branding and role-based access into all client and coach experiences.
- Preserve accessibility, responsive layout, light/dark mode support, and localization from the start.

## Technical requirements

- Cloud backend with secure storage and encrypted sensitive data.
- RESTful API between clients, portals, and backend services.
- Real-time updates for messaging, workout logging, and notifications.
- Role-based authorization for Admin, Coach, Client, and Partner capabilities.
- iOS 13+ and Android 9+ support across phone and tablet form factors.
- Adaptive layouts, screen reader support, sufficient color contrast, and white-label theming.
- Payment integration with Stripe, PayPal, or equivalent.
- Video integration through WebRTC, Jitsi, Zoom, Twilio, OpenTok, or equivalent.
- Push notifications through Firebase Cloud Messaging or equivalent.
- Analytics through Firebase Analytics, Google Analytics, or custom solutions.
- Localization starting with English, Spanish, and French.
- Backups, scalable architecture, reliable operations, and efficient sync.

## Initial repository implementation

This implementation creates:

- A shared TypeScript domain package for tenant, user, intake, biomarker, wearable, daily dashboard, workout, meal, lifestyle, tracking, connector, and plan objects.
- Demo data for one white-label tenant, coach, client, daily dashboard, exercise library, meal library, requirement areas, and partner connectors.
- A React/Vite web portal prototype showing Admin and Coach portal responsibilities, client context, plan review, libraries, tracking, communication, and connector readiness.
- A React Native mobile prototype showing the client daily dashboard, coach message, workouts, meals, lifestyle tasks, tracking prompts, and safety notes.

## Near-term technical roadmap

1. Add backend API, persistence, authentication, role-based access, and tenant isolation.
2. Implement coach and admin portal routing as separate role-aware experiences.
3. Build CRUD flows for workouts, workout programs, meals, meal programs, lifestyle plans, exercises, ingredients, and clients.
4. Implement client calendar, workout execution, meal preparation, shopping lists, result tracking, analytics, and notifications.
5. Add messaging, attachments, video consultations, scheduled meetings, push notifications, and triggered communications.
6. Add subscription/payment integration and coach/client entitlement checks.
7. Add partner assignment feed ingestion and wearable/health data connectors.
8. Add audit logs, privacy controls, backup strategy, accessibility validation, and localization.
