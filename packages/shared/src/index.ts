export type WearableProvider =
  | "oura"
  | "apple_watch"
  | "garmin"
  | "fitbit"
  | "whoop"
  | "manual";

export type Goal =
  | "fat_loss"
  | "muscle_gain"
  | "performance"
  | "longevity"
  | "maintenance";

export type DataSource =
  | "genetics"
  | "bloodwork"
  | "wearables"
  | "coach_intake";

export type PlanStatus = "draft" | "coach_review" | "approved" | "published";

export interface BrandPalette {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
}

export interface WhiteLabelTenant {
  id: string;
  name: string;
  ownerOrganization: string;
  palette: BrandPalette;
  supportedWearables: WearableProvider[];
}

export interface GeneticTrait {
  marker: string;
  label: string;
  finding: string;
  coachingImplication: string;
}

export interface BiomarkerResult {
  marker: string;
  label: string;
  value: number;
  unit: string;
  optimalRange: string;
  status: "low" | "optimal" | "elevated";
  coachingImplication: string;
}

export interface WearableSummary {
  provider: WearableProvider;
  readinessScore: number;
  sleepScore: number;
  averageRestingHeartRate: number;
  hrvTrend: "declining" | "stable" | "improving";
  weeklyTrainingLoad: "low" | "moderate" | "high";
}

export interface CoachIntake {
  goals: Goal[];
  trainingAge: "beginner" | "intermediate" | "advanced";
  nutritionPreference: string;
  dietaryRestrictions: string[];
  injuryConsiderations: string[];
  coachNotes: string;
}

export interface ClientProfile {
  id: string;
  name: string;
  age: number;
  coachName: string;
  tenantId: string;
  intake: CoachIntake;
  genetics: GeneticTrait[];
  bloodwork: BiomarkerResult[];
  wearable: WearableSummary;
}

export interface Recommendation {
  id: string;
  title: string;
  rationale: string;
  actions: string[];
  sourceInputs: DataSource[];
}

export interface NutritionPlan {
  calories: string;
  protein: string;
  mealTiming: string;
  recommendations: Recommendation[];
}

export interface TrainingPlan {
  weeklyStructure: string;
  recoveryGuidance: string;
  recommendations: Recommendation[];
}

export interface CoachTouchpoint {
  cadence: string;
  messagePrompt: string;
  dataToReview: DataSource[];
}

export interface PersonalizedPlan {
  clientId: string;
  status: PlanStatus;
  confidenceScore: number;
  nutrition: NutritionPlan;
  training: TrainingPlan;
  coachTouchpoints: CoachTouchpoint[];
  safetyNotes: string[];
}

export const clutchTenant: WhiteLabelTenant = {
  id: "tenant-clutch-demo",
  name: "Clutch Performance",
  ownerOrganization: "Clutch",
  palette: {
    primary: "#111827",
    secondary: "#2563eb",
    accent: "#22c55e",
    background: "#f8fafc"
  },
  supportedWearables: [
    "oura",
    "apple_watch",
    "garmin",
    "fitbit",
    "whoop"
  ]
};

export const demoClient: ClientProfile = {
  id: "client-ava-martinez",
  name: "Ava Martinez",
  age: 34,
  coachName: "Jordan Lee",
  tenantId: clutchTenant.id,
  intake: {
    goals: ["fat_loss", "performance"],
    trainingAge: "intermediate",
    nutritionPreference: "high-protein Mediterranean",
    dietaryRestrictions: ["gluten-sensitive"],
    injuryConsiderations: ["history of right knee irritation"],
    coachNotes:
      "Client is consistent during weekdays but struggles with travel meals and late training sessions."
  },
  genetics: [
    {
      marker: "FTO",
      label: "Satiety and appetite regulation",
      finding: "Elevated tendency toward appetite variability",
      coachingImplication:
        "Prioritize protein-forward meals and fiber targets at breakfast and lunch."
    },
    {
      marker: "ACTN3",
      label: "Power endurance response",
      finding: "Mixed power and endurance profile",
      coachingImplication:
        "Blend progressive strength work with aerobic intervals instead of biasing one modality."
    }
  ],
  bloodwork: [
    {
      marker: "25OHD",
      label: "Vitamin D",
      value: 28,
      unit: "ng/mL",
      optimalRange: "30-60 ng/mL",
      status: "low",
      coachingImplication:
        "Flag for provider review and reinforce outdoor walks and vitamin-D-rich foods."
    },
    {
      marker: "A1C",
      label: "Hemoglobin A1C",
      value: 5.4,
      unit: "%",
      optimalRange: "< 5.7%",
      status: "optimal",
      coachingImplication:
        "Carbohydrate intake can be periodized around training sessions."
    }
  ],
  wearable: {
    provider: "oura",
    readinessScore: 78,
    sleepScore: 72,
    averageRestingHeartRate: 58,
    hrvTrend: "stable",
    weeklyTrainingLoad: "moderate"
  }
};

export function buildPlanSnapshot(client: ClientProfile): PersonalizedPlan {
  const lowBiomarkers = client.bloodwork.filter((result) => result.status === "low");
  const elevatedBiomarkers = client.bloodwork.filter(
    (result) => result.status === "elevated"
  );
  const hasRecoveryPressure =
    client.wearable.sleepScore < 75 ||
    client.wearable.hrvTrend === "declining" ||
    client.wearable.weeklyTrainingLoad === "high";

  return {
    clientId: client.id,
    status: "coach_review",
    confidenceScore: getConfidenceScore(client),
    nutrition: {
      calories: client.intake.goals.includes("fat_loss")
        ? "Moderate deficit with weekly coach review"
        : "Maintenance target with performance-day increases",
      protein: "1.6-2.2 g/kg/day, distributed across 3-5 meals",
      mealTiming:
        "Anchor carbohydrates around training and keep travel meals protein-forward.",
      recommendations: [
        {
          id: "nutrition-protein-satiety",
          title: "Protein and fiber anchors",
          rationale:
            "Coach intake and genetics both indicate that satiety consistency is a key adherence lever.",
          actions: [
            "Add a protein target to breakfast and lunch.",
            "Pair each main meal with a high-fiber plant source.",
            "Prepare two travel-friendly meal templates for weekdays."
          ],
          sourceInputs: ["coach_intake", "genetics"]
        },
        {
          id: "nutrition-biomarker-review",
          title: "Biomarker-aware nutrition notes",
          rationale:
            "Bloodwork highlights items the coach should monitor without replacing clinician guidance.",
          actions: [
            ...lowBiomarkers.map(
              (result) => `Review low ${result.label} (${result.value}${result.unit}) with the client.`
            ),
            ...elevatedBiomarkers.map(
              (result) => `Discuss elevated ${result.label} (${result.value}${result.unit}) with the client.`
            )
          ],
          sourceInputs: ["bloodwork"]
        }
      ]
    },
    training: {
      weeklyStructure:
        "3 strength sessions, 2 aerobic conditioning sessions, and 1 optional recovery session.",
      recoveryGuidance: hasRecoveryPressure
        ? "Use sleep and HRV trends to downshift intensity when readiness drops."
        : "Progress volume when readiness and soreness remain stable.",
      recommendations: [
        {
          id: "training-hybrid-profile",
          title: "Hybrid strength and conditioning block",
          rationale:
            "Genetics, goals, and training age support a balanced progression across strength and aerobic work.",
          actions: [
            "Use lower-body strength progressions that respect knee history.",
            "Place intervals after the highest-readiness day of the week.",
            "Track perceived exertion after every session."
          ],
          sourceInputs: ["genetics", "coach_intake", "wearables"]
        },
        {
          id: "training-recovery-loop",
          title: "Wearable-informed recovery loop",
          rationale:
            "Wearable readiness, sleep, HRV, and training load help the coach adjust weekly programming.",
          actions: [
            "Review sleep score before high-intensity training.",
            "Swap intervals for zone 2 when HRV declines for two consecutive days.",
            "Send a recovery prompt after late training sessions."
          ],
          sourceInputs: ["wearables"]
        }
      ]
    },
    coachTouchpoints: [
      {
        cadence: "Weekly",
        messagePrompt:
          "Ask what made nutrition easiest and hardest this week, then adjust the next meal template.",
        dataToReview: ["coach_intake", "wearables"]
      },
      {
        cadence: "Monthly",
        messagePrompt:
          "Review progress, adherence, and any updated labs or wearable trends before publishing the next block.",
        dataToReview: ["bloodwork", "wearables", "coach_intake"]
      }
    ],
    safetyNotes: [
      "Recommendations require coach approval before client publication.",
      "Blood markers and genetic findings are coaching context, not diagnosis or medical advice.",
      ...client.intake.injuryConsiderations.map(
        (consideration) => `Account for injury consideration: ${consideration}.`
      )
    ]
  };
}

function getConfidenceScore(client: ClientProfile): number {
  const sourceCount = [
    client.genetics.length > 0,
    client.bloodwork.length > 0,
    client.wearable.provider !== "manual",
    client.intake.goals.length > 0
  ].filter(Boolean).length;

  const recoveryPenalty = client.wearable.sleepScore < 65 ? 8 : 0;
  return Math.max(60, Math.min(96, 64 + sourceCount * 8 - recoveryPenalty));
}
