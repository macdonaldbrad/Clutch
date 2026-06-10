import {
  adminPortalCapabilities,
  buildPlanSnapshot,
  coachPortalCapabilities,
  clutchTenant,
  demoCoach,
  demoClient,
  demoDailyDashboard,
  demoExerciseLibrary,
  demoMealLibrary,
  partnerConnectors,
  requirementAreas,
  type BiomarkerResult,
  type PortalCapability,
  type Recommendation
} from "@clutch/shared";

const plan = buildPlanSnapshot(demoClient);

const sourceLabels = [
  {
    label: "Genetic test",
    detail: `${demoClient.genetics.length} coaching traits`
  },
  {
    label: "Blood tests",
    detail: `${demoClient.bloodwork.length} biomarkers imported`
  },
  {
    label: "Wearables",
    detail: `${demoClient.wearable.provider.replace("_", " ")} sync active`
  },
  {
    label: "Coach intake",
    detail: `${demoClient.intake.goals.length} goals + preferences`
  },
  {
    label: "Daily dashboard",
    detail: `${demoDailyDashboard.trainingPlan.workouts.length} workout + ${demoDailyDashboard.mealPlan.meals.length} meals`
  }
];

const capabilityGroups = [
  {
    title: "Coach portal",
    capabilities: coachPortalCapabilities
  },
  {
    title: "Admin portal",
    capabilities: adminPortalCapabilities
  }
];

export function App() {
  return (
    <main className="app-shell">
      <aside className="sidebar" aria-label="Clutch admin navigation">
        <div className="tenant-mark">C</div>
        <div>
          <p className="eyebrow">White-label tenant</p>
          <h1>{clutchTenant.name}</h1>
          <p className="muted">{clutchTenant.ownerOrganization} admin module</p>
        </div>
        <nav>
          <a href="#overview">Overview</a>
          <a href="#clients">Clients</a>
          <a href="#daily-dashboard">Daily dashboard</a>
          <a href="#plan-review">Plan review</a>
          <a href="#portal-scope">Portal scope</a>
          <a href="#integrations">Integrations</a>
        </nav>
      </aside>

      <section className="content">
        <header className="hero" id="overview">
          <div>
            <p className="eyebrow">Coach-reviewed personalization</p>
            <h2>Operate daily training, nutrition, lifestyle, and coaching workflows.</h2>
            <p>
              Clutch combines white-label branding, plan creation, daily client
              execution, result tracking, communications, and partner data feeds
              across Admin, Coach, Client, and Partner roles.
            </p>
          </div>
          <div className="score-card">
            <span>Plan confidence</span>
            <strong>{plan.confidenceScore}%</strong>
            <small>Status: {plan.status.replace("_", " ")}</small>
          </div>
        </header>

        <section className="grid five-column" aria-label="Connected sources">
          {sourceLabels.map((source) => (
            <article className="card" key={source.label}>
              <p className="eyebrow">{source.label}</p>
              <strong>{source.detail}</strong>
            </article>
          ))}
        </section>

        <section className="grid two-column" id="clients">
          <article className="panel">
            <div className="section-heading">
              <p className="eyebrow">Active client</p>
              <h3>{demoClient.name}</h3>
            </div>
            <dl className="profile-list">
              <div>
                <dt>Coach</dt>
                <dd>{demoCoach.name}</dd>
              </div>
              <div>
                <dt>Gym</dt>
                <dd>{demoCoach.gymName}</dd>
              </div>
              <div>
                <dt>Goals</dt>
                <dd>{demoClient.intake.goals.join(", ").replaceAll("_", " ")}</dd>
              </div>
              <div>
                <dt>Nutrition style</dt>
                <dd>{demoClient.intake.nutritionPreference}</dd>
              </div>
              <div>
                <dt>Training age</dt>
                <dd>{demoClient.intake.trainingAge}</dd>
              </div>
            </dl>
            <p className="coach-note">{demoClient.intake.coachNotes}</p>
          </article>

          <article className="panel">
            <div className="section-heading">
              <p className="eyebrow">Wearable snapshot</p>
              <h3>{demoClient.wearable.provider.replace("_", " ")}</h3>
            </div>
            <div className="metric-row">
              <Metric label="Readiness" value={demoClient.wearable.readinessScore} />
              <Metric label="Sleep" value={demoClient.wearable.sleepScore} />
              <Metric
                label="RHR"
                value={demoClient.wearable.averageRestingHeartRate}
                suffix="bpm"
              />
            </div>
            <p className="muted">
              HRV trend is {demoClient.wearable.hrvTrend}; weekly training load
              is {demoClient.wearable.weeklyTrainingLoad}.
            </p>
          </article>
        </section>

        <section className="grid three-column" id="daily-dashboard">
          <article className="panel">
            <div className="section-heading">
              <p className="eyebrow">Mobile app</p>
              <h3>Daily dashboard</h3>
            </div>
            {demoDailyDashboard.coachMessage ? (
              <p className="coach-note">{demoDailyDashboard.coachMessage.body}</p>
            ) : null}
            <ul className="compact-list">
              <li>{demoDailyDashboard.trainingPlan.workouts.length} scheduled workout</li>
              <li>{demoDailyDashboard.mealPlan.meals.length} planned meals</li>
              <li>
                {demoDailyDashboard.lifestylePlan.recommendations.length} lifestyle
                recommendations
              </li>
              <li>{demoDailyDashboard.measurementPrompts.length} tracking prompts</li>
            </ul>
          </article>

          <article className="panel">
            <div className="section-heading">
              <p className="eyebrow">Training plan</p>
              <h3>{demoDailyDashboard.trainingPlan.workouts[0]?.name}</h3>
            </div>
            <p>
              {demoDailyDashboard.trainingPlan.workouts[0]?.expectedDurationMinutes} min,
              {demoDailyDashboard.trainingPlan.workouts[0]?.lockedByCoach
                ? " locked by coach"
                : " editable by client"}
            </p>
            <ul className="compact-list">
              {demoDailyDashboard.trainingPlan.workouts[0]?.steps.map((step) => (
                <li key={step.id}>
                  {step.type === "exercise"
                    ? `${step.expectedIntensity} exercise step`
                    : `${step.durationSeconds}s rest`}
                </li>
              ))}
            </ul>
          </article>

          <article className="panel">
            <div className="section-heading">
              <p className="eyebrow">Meal plan</p>
              <h3>Serving-aware recipes</h3>
            </div>
            <ul className="compact-list">
              {demoDailyDashboard.mealPlan.meals.map((meal) => (
                <li key={meal.id}>
                  {meal.name} - {meal.proteinGrams}g protein, {meal.servings} serving
                </li>
              ))}
            </ul>
            <p className="muted">{demoDailyDashboard.mealPlan.notes}</p>
          </article>
        </section>

        <section className="grid two-column" id="plan-review">
          <PlanColumn
            title="Nutrition plan"
            summary={`${plan.nutrition.calories}. ${plan.nutrition.protein}.`}
            recommendations={plan.nutrition.recommendations}
          />
          <PlanColumn
            title="Training plan"
            summary={`${plan.training.weeklyStructure} ${plan.training.recoveryGuidance}`}
            recommendations={plan.training.recommendations}
          />
        </section>

        <section className="grid two-column" id="portal-scope">
          {capabilityGroups.map((group) => (
            <article className="panel" key={group.title}>
              <div className="section-heading">
                <p className="eyebrow">Requirements scope</p>
                <h3>{group.title}</h3>
              </div>
              <div className="capability-list">
                {group.capabilities.map((capability) => (
                  <Capability key={capability.id} capability={capability} />
                ))}
              </div>
            </article>
          ))}
        </section>

        <section className="grid two-column" id="integrations">
          <article className="panel">
            <div className="section-heading">
              <p className="eyebrow">Bloodwork</p>
              <h3>Biomarker coaching context</h3>
            </div>
            <div className="biomarker-list">
              {demoClient.bloodwork.map((result) => (
                <Biomarker key={result.marker} result={result} />
              ))}
            </div>
          </article>

          <article className="panel">
            <div className="section-heading">
              <p className="eyebrow">Libraries and connectors</p>
              <h3>Operational readiness</h3>
            </div>
            <ul className="touchpoint-list">
              <li>
                <strong>Exercise library</strong>
                <span>{demoExerciseLibrary.length} modeled exercises with tags and media</span>
              </li>
              <li>
                <strong>Meal library</strong>
                <span>{demoMealLibrary.length} modeled meals with ingredients and nutrition</span>
              </li>
              {partnerConnectors.map((connector) => (
                <li key={connector.id}>
                  <strong>{connector.name}</strong>
                  <span>
                    {connector.transferMode} transfer - {connector.status.replaceAll("_", " ")}
                  </span>
                </li>
              ))}
            </ul>
            <div className="safety-box">
              <strong>Safety notes</strong>
              <ul>
                {plan.safetyNotes.map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>
            </div>
          </article>
        </section>

        <section className="panel">
          <div className="section-heading">
            <p className="eyebrow">Traceability</p>
            <h3>Requirement areas represented in this foundation</h3>
          </div>
          <div className="requirement-grid">
            {requirementAreas.map((area) => (
              <article key={area.id}>
                <strong>{area.title}</strong>
                <span>{area.userExperience.replace("_", " ")}</span>
                <p>{area.description}</p>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}

function Capability({ capability }: { capability: PortalCapability }) {
  return (
    <article className="capability">
      <div>
        <strong>{capability.title}</strong>
        <span>{capability.status.replaceAll("_", " ")}</span>
      </div>
      <p>{capability.description}</p>
    </article>
  );
}

function Metric({
  label,
  value,
  suffix
}: {
  label: string;
  value: number;
  suffix?: string;
}) {
  return (
    <div className="metric">
      <span>{label}</span>
      <strong>
        {value}
        {suffix ? <small>{suffix}</small> : null}
      </strong>
    </div>
  );
}

function PlanColumn({
  title,
  summary,
  recommendations
}: {
  title: string;
  summary: string;
  recommendations: Recommendation[];
}) {
  return (
    <article className="panel plan-column">
      <div className="section-heading">
        <p className="eyebrow">Draft for review</p>
        <h3>{title}</h3>
      </div>
      <p>{summary}</p>
      <div className="recommendation-list">
        {recommendations.map((recommendation) => (
          <section key={recommendation.id} className="recommendation">
            <h4>{recommendation.title}</h4>
            <p>{recommendation.rationale}</p>
            <ul>
              {recommendation.actions.map((action) => (
                <li key={action}>{action}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </article>
  );
}

function Biomarker({ result }: { result: BiomarkerResult }) {
  return (
    <article className={`biomarker biomarker-${result.status}`}>
      <div>
        <strong>{result.label}</strong>
        <span>{result.optimalRange}</span>
      </div>
      <p>
        {result.value}
        {result.unit} - {result.status}
      </p>
      <small>{result.coachingImplication}</small>
    </article>
  );
}
