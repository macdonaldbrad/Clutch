import {
  buildPlanSnapshot,
  clutchTenant,
  demoClient,
  type BiomarkerResult,
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
          <a href="#plan-review">Plan review</a>
          <a href="#integrations">Integrations</a>
        </nav>
      </aside>

      <section className="content">
        <header className="hero" id="overview">
          <div>
            <p className="eyebrow">Coach-reviewed personalization</p>
            <h2>Turn genetics, labs, wearables, and intake into a plan.</h2>
            <p>
              Clutch helps trainers create nutrition and workout guidance that
              combines objective data with coach context before anything is
              published to the client app.
            </p>
          </div>
          <div className="score-card">
            <span>Plan confidence</span>
            <strong>{plan.confidenceScore}%</strong>
            <small>Status: {plan.status.replace("_", " ")}</small>
          </div>
        </header>

        <section className="grid four-column" aria-label="Connected sources">
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
                <dd>{demoClient.coachName}</dd>
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
              <p className="eyebrow">Coach communication</p>
              <h3>Suggested touchpoints</h3>
            </div>
            <ul className="touchpoint-list">
              {plan.coachTouchpoints.map((touchpoint) => (
                <li key={touchpoint.cadence}>
                  <strong>{touchpoint.cadence}</strong>
                  <span>{touchpoint.messagePrompt}</span>
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
      </section>
    </main>
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
