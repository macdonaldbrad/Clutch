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

export type UserRole = "admin" | "coach" | "client" | "partner";

export type TimeOfDay = "morning" | "afternoon" | "evening" | "custom";

export type DayPart = "breakfast" | "lunch" | "snack" | "dinner";

export type DifficultyLevel = "easy" | "moderate" | "hard";

export type WorkoutFlag = "drop_set" | "super_set" | "rest_pause";

export type MeasurementCategory =
  | "body_image"
  | "body_weight"
  | "body_fat"
  | "caloric_intake"
  | "heart_rate"
  | "blood_pressure"
  | "cholesterol"
  | "body_mass"
  | "caloric_burn";

export type TrackingInterval =
  | "daily"
  | "every_x_days"
  | "specific_weekdays"
  | "every_x_weeks"
  | "monthly_on_day";

export type CommunicationChannel =
  | "chat"
  | "announcement"
  | "video"
  | "audio"
  | "push"
  | "triggered";

export type PaymentProvider = "stripe" | "paypal" | "manual";

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
  enabledFeatures: string[];
  locales: string[];
  paymentProviders: PaymentProvider[];
}

export interface CoachProfile {
  id: string;
  name: string;
  certifications: string[];
  biography: string;
  gymName: string;
  gymLocation: string;
  logoUrl?: string;
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

export interface MediaAsset {
  type: "image" | "video" | "audio";
  url: string;
  altText: string;
}

export interface ExerciseLibraryItem {
  id: string;
  name: string;
  description: string;
  instructions: string[];
  instructionalMedia: MediaAsset[];
  categoryTags: string[];
  bodyFocusTags: string[];
  equipmentRequired: string[];
  difficulty: DifficultyLevel;
  isFavorite: boolean;
}

export interface ExerciseStep {
  type: "exercise";
  id: string;
  exerciseId: string;
  expectedIntensity: DifficultyLevel;
  repetitions?: number;
  distance?: string;
  durationSeconds?: number;
  targetHeartRate?: number;
  trainingZone?: number;
  flags: WorkoutFlag[];
}

export interface RestStep {
  type: "rest";
  id: string;
  durationSeconds: number;
  targetRestingHeartRate?: number;
}

export type WorkoutStep = ExerciseStep | RestStep;

export interface Workout {
  id: string;
  name: string;
  description: string;
  expectedDurationMinutes: number;
  timeOfDay: TimeOfDay;
  scheduledAt: string;
  assignedByCoach: boolean;
  lockedByCoach: boolean;
  completed: boolean;
  resultsNote?: string;
  coachMessage?: string;
  steps: WorkoutStep[];
  alternateWorkoutIds: string[];
}

export interface DailyTrainingPlan {
  planDate: string;
  workouts: Workout[];
}

export interface Ingredient {
  id: string;
  name: string;
  description: string;
  calories: number;
  proteinGrams: number;
  carbohydrateGrams: number;
  fatGrams: number;
}

export interface RecipeIngredient {
  ingredient: Ingredient;
  prepModifier?: string;
  quantity: number;
  unit: string;
}

export interface Meal {
  id: string;
  name: string;
  description: string;
  tags: string[];
  ingredients: RecipeIngredient[];
  instructions: string[];
  preparationTimeMinutes: number;
  media: MediaAsset[];
  calories: number;
  proteinGrams: number;
  fatGrams: number;
  carbohydrateGrams: number;
  dayPart: DayPart;
  servings: number;
  isFavorite: boolean;
  completed: boolean;
  alternateMealIds: string[];
}

export interface DailyMealPlan {
  planDate: string;
  meals: Meal[];
  notes?: string;
}

export interface LifestyleRecommendation {
  id: string;
  recommendation: string;
  assignedDays: string[];
  dateRange: {
    start: string;
    end: string;
  };
  completedToday: boolean;
  comments?: string;
}

export interface LifestylePlan {
  recommendations: LifestyleRecommendation[];
}

export interface MeasurementPrompt {
  id: string;
  category: MeasurementCategory;
  label: string;
  interval: TrackingInterval;
  dueDate: string;
  overdue: boolean;
  goal?: string;
  lastValue?: string;
}

export interface CoachMessage {
  id: string;
  channel: CommunicationChannel;
  title: string;
  body: string;
  media?: MediaAsset;
  scheduledFor: string;
}

export interface ScheduledMeeting {
  id: string;
  title: string;
  format: "video" | "audio" | "chat";
  scheduledFor: string;
  reminderMinutesBefore: number;
}

export interface DailyDashboard {
  clientId: string;
  date: string;
  coachMessage?: CoachMessage;
  trainingPlan: DailyTrainingPlan;
  mealPlan: DailyMealPlan;
  lifestylePlan: LifestylePlan;
  measurementPrompts: MeasurementPrompt[];
  meetings: ScheduledMeeting[];
}

export interface PortalCapability {
  id: string;
  role: UserRole;
  title: string;
  description: string;
  status: "modeled" | "prototype" | "planned";
}

export interface RequirementArea {
  id: string;
  title: string;
  description: string;
  userExperience: "mobile" | "coach_portal" | "admin_portal" | "partner_connector";
  priority: "core" | "integration" | "future";
}

export interface PartnerConnector {
  id: string;
  name: string;
  transferMode: "realtime" | "batch" | "both";
  payloads: string[];
  status: "planned" | "modeled" | "ready_for_api";
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
  ],
  enabledFeatures: [
    "white_label_mobile",
    "coach_portal",
    "admin_portal",
    "daily_dashboard",
    "workout_builder",
    "meal_planning",
    "lifestyle_planning",
    "results_tracking",
    "messaging",
    "video_consultations",
    "subscriptions",
    "partner_feeds"
  ],
  locales: ["en", "es", "fr"],
  paymentProviders: ["stripe", "paypal", "manual"]
};

export const demoCoach: CoachProfile = {
  id: "coach-jordan-lee",
  name: "Jordan Lee",
  certifications: ["NASM CPT", "Precision Nutrition L1"],
  biography:
    "Strength and nutrition coach focused on sustainable fat loss and performance.",
  gymName: "Clutch Performance Lab",
  gymLocation: "Austin, TX"
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

const chicken: Ingredient = {
  id: "ingredient-chicken",
  name: "Chicken breast",
  description: "Lean cooked chicken breast",
  calories: 165,
  proteinGrams: 31,
  carbohydrateGrams: 0,
  fatGrams: 4
};

const rice: Ingredient = {
  id: "ingredient-rice",
  name: "Brown rice",
  description: "Cooked long-grain brown rice",
  calories: 216,
  proteinGrams: 5,
  carbohydrateGrams: 45,
  fatGrams: 2
};

const almonds: Ingredient = {
  id: "ingredient-almonds",
  name: "Almonds",
  description: "Raw almonds",
  calories: 164,
  proteinGrams: 6,
  carbohydrateGrams: 6,
  fatGrams: 14
};

export const demoExerciseLibrary: ExerciseLibraryItem[] = [
  {
    id: "exercise-goblet-squat",
    name: "Goblet squat",
    description: "Lower-body strength movement with a dumbbell or kettlebell.",
    instructions: [
      "Hold the weight close to the chest.",
      "Sit between the hips while keeping the chest tall.",
      "Drive through the floor to stand."
    ],
    instructionalMedia: [
      {
        type: "video",
        url: "https://example.com/exercises/goblet-squat.mp4",
        altText: "Coach demonstrating a goblet squat"
      }
    ],
    categoryTags: ["strength"],
    bodyFocusTags: ["legs", "core"],
    equipmentRequired: ["dumbbell"],
    difficulty: "moderate",
    isFavorite: true
  },
  {
    id: "exercise-zone-2-bike",
    name: "Zone 2 bike",
    description: "Low-impact aerobic conditioning on a stationary bike.",
    instructions: [
      "Warm up for five minutes.",
      "Hold a conversational pace in the prescribed heart-rate zone.",
      "Cool down until breathing returns to baseline."
    ],
    instructionalMedia: [],
    categoryTags: ["cardio", "recovery"],
    bodyFocusTags: ["legs"],
    equipmentRequired: ["stationary bike"],
    difficulty: "easy",
    isFavorite: false
  }
];

export const demoMealLibrary: Meal[] = [
  {
    id: "meal-mediterranean-bowl",
    name: "Mediterranean chicken bowl",
    description: "Protein-forward bowl for training-day lunch.",
    tags: ["high-protein", "gluten-sensitive", "meal-prep"],
    ingredients: [
      {
        ingredient: chicken,
        prepModifier: "grilled",
        quantity: 5,
        unit: "oz"
      },
      {
        ingredient: rice,
        quantity: 1,
        unit: "cup"
      },
      {
        ingredient: almonds,
        prepModifier: "sliced",
        quantity: 0.25,
        unit: "cup"
      }
    ],
    instructions: [
      "Warm rice and chicken.",
      "Add vegetables and almonds.",
      "Finish with lemon and olive oil."
    ],
    preparationTimeMinutes: 18,
    media: [
      {
        type: "image",
        url: "https://example.com/meals/mediterranean-bowl.jpg",
        altText: "Mediterranean chicken bowl"
      }
    ],
    calories: 560,
    proteinGrams: 48,
    fatGrams: 18,
    carbohydrateGrams: 52,
    dayPart: "lunch",
    servings: 1,
    isFavorite: true,
    completed: false,
    alternateMealIds: ["meal-salmon-rice-plate"]
  },
  {
    id: "meal-protein-yogurt",
    name: "Protein yogurt parfait",
    description: "Quick breakfast with protein, berries, and nuts.",
    tags: ["breakfast", "quick", "high-protein"],
    ingredients: [
      {
        ingredient: almonds,
        prepModifier: "chopped",
        quantity: 0.15,
        unit: "cup"
      }
    ],
    instructions: [
      "Add yogurt to a bowl.",
      "Top with berries and almonds.",
      "Serve chilled."
    ],
    preparationTimeMinutes: 6,
    media: [],
    calories: 340,
    proteinGrams: 32,
    fatGrams: 12,
    carbohydrateGrams: 26,
    dayPart: "breakfast",
    servings: 1,
    isFavorite: false,
    completed: true,
    alternateMealIds: []
  }
];

export const demoDailyDashboard: DailyDashboard = {
  clientId: demoClient.id,
  date: "2026-06-10",
  coachMessage: {
    id: "message-daily-brief",
    channel: "video",
    title: "Daily plan walkthrough",
    body:
      "Keep the morning strength work controlled, then use lunch as your protein anchor before the afternoon walk.",
    media: {
      type: "video",
      url: "https://example.com/messages/daily-brief.mp4",
      altText: "Coach Jordan giving the daily plan walkthrough"
    },
    scheduledFor: "2026-06-10T07:00:00-05:00"
  },
  trainingPlan: {
    planDate: "2026-06-10",
    workouts: [
      {
        id: "workout-lower-strength",
        name: "Lower strength and core",
        description: "Coach-assigned workout with knee-friendly progressions.",
        expectedDurationMinutes: 45,
        timeOfDay: "morning",
        scheduledAt: "2026-06-10T08:00:00-05:00",
        assignedByCoach: true,
        lockedByCoach: true,
        completed: false,
        coachMessage: "Keep effort at 8/10 and do not chase failure today.",
        steps: [
          {
            type: "exercise",
            id: "step-goblet-squat",
            exerciseId: "exercise-goblet-squat",
            expectedIntensity: "moderate",
            repetitions: 10,
            flags: [],
            trainingZone: 2
          },
          {
            type: "rest",
            id: "step-rest-1",
            durationSeconds: 90
          },
          {
            type: "exercise",
            id: "step-zone-2-bike",
            exerciseId: "exercise-zone-2-bike",
            expectedIntensity: "easy",
            durationSeconds: 900,
            flags: ["super_set"],
            trainingZone: 2
          }
        ],
        alternateWorkoutIds: ["workout-hotel-strength"]
      }
    ]
  },
  mealPlan: {
    planDate: "2026-06-10",
    notes: "Adjust servings if training runs later than planned.",
    meals: demoMealLibrary
  },
  lifestylePlan: {
    recommendations: [
      {
        id: "lifestyle-sleep",
        recommendation: "Target 8 hours of sleep and start wind-down by 9:30 PM.",
        assignedDays: ["monday", "tuesday", "wednesday", "thursday", "sunday"],
        dateRange: {
          start: "2026-06-01",
          end: "2026-06-30"
        },
        completedToday: false
      },
      {
        id: "lifestyle-steps",
        recommendation: "Complete 9,000 steps with a 15-minute post-lunch walk.",
        assignedDays: ["daily"],
        dateRange: {
          start: "2026-06-01",
          end: "2026-06-30"
        },
        completedToday: true,
        comments: "Morning commute covered most steps."
      }
    ]
  },
  measurementPrompts: [
    {
      id: "prompt-weight",
      category: "body_weight",
      label: "Morning body weight",
      interval: "specific_weekdays",
      dueDate: "2026-06-10",
      overdue: false,
      goal: "Trend down 0.5 lb/week",
      lastValue: "162.4 lb"
    },
    {
      id: "prompt-progress-photo",
      category: "body_image",
      label: "Monthly progress photos",
      interval: "monthly_on_day",
      dueDate: "2026-06-05",
      overdue: true
    }
  ],
  meetings: [
    {
      id: "meeting-check-in",
      title: "Coach check-in",
      format: "video",
      scheduledFor: "2026-06-10T17:30:00-05:00",
      reminderMinutesBefore: 15
    }
  ]
};

export const coachPortalCapabilities: PortalCapability[] = [
  {
    id: "coach-profile-branding",
    role: "coach",
    title: "Profile and white-label branding",
    description:
      "Manage professional profile, gym details, logos, colors, fonts, and client-facing branding.",
    status: "prototype"
  },
  {
    id: "coach-client-management",
    role: "coach",
    title: "Client invitations and management",
    description:
      "Invite clients by email or text, edit profiles, review subscriptions, and manage status.",
    status: "planned"
  },
  {
    id: "coach-programming",
    role: "coach",
    title: "Workout, meal, and lifestyle programming",
    description:
      "Create plans, assign programs, lock workouts, upload videos, bulk import, and set alternatives.",
    status: "modeled"
  },
  {
    id: "coach-communications",
    role: "coach",
    title: "Messaging and triggered communications",
    description:
      "Send direct messages, bulk announcements, video consults, meeting reminders, and automated replies.",
    status: "modeled"
  }
];

export const adminPortalCapabilities: PortalCapability[] = [
  {
    id: "admin-coach-management",
    role: "admin",
    title: "Coach management and emulation",
    description:
      "Activate coaches, manage subscriptions, enable features, and emulate coach accounts.",
    status: "planned"
  },
  {
    id: "admin-exercise-library",
    role: "admin",
    title: "Exercise library administration",
    description:
      "Add, edit, and remove exercises with media, category tags, body focus, equipment, and difficulty.",
    status: "modeled"
  },
  {
    id: "admin-meal-library",
    role: "admin",
    title: "Meal and ingredient library administration",
    description:
      "Maintain meals, ingredient nutrition, recipe instructions, media, and nutritional variations.",
    status: "modeled"
  }
];

export const requirementAreas: RequirementArea[] = [
  {
    id: "mobile-daily-dashboard",
    title: "Daily dashboard",
    description:
      "Daily coach message, workouts, meals, lifestyle tasks, result prompts, and meetings.",
    userExperience: "mobile",
    priority: "core"
  },
  {
    id: "mobile-results-tracking",
    title: "Results tracking and analytics",
    description:
      "Photos, measurements, goals, tracking intervals, overdue prompts, graphs, and tables.",
    userExperience: "mobile",
    priority: "core"
  },
  {
    id: "coach-current-client",
    title: "Current client context",
    description:
      "Persistent selected client while creating plans, reviewing logs, and assigning programs.",
    userExperience: "coach_portal",
    priority: "core"
  },
  {
    id: "admin-library-maintenance",
    title: "Library maintenance",
    description:
      "Admin maintenance for exercise library, meal library, meal variations, and ingredients.",
    userExperience: "admin_portal",
    priority: "core"
  },
  {
    id: "partner-plan-feed",
    title: "Plan assignment feed",
    description:
      "Partner JSON feed assigning workouts, meals, lifestyle recommendations, and coach notes.",
    userExperience: "partner_connector",
    priority: "integration"
  }
];

export const partnerConnectors: PartnerConnector[] = [
  {
    id: "connector-plan-assignment",
    name: "Bulk plan assignment API",
    transferMode: "batch",
    payloads: ["clientId", "assignmentDate", "workoutIds", "mealIds", "lifestyleRecommendations", "coachNotes"],
    status: "modeled"
  },
  {
    id: "connector-apple-health",
    name: "Apple Health data connection",
    transferMode: "both",
    payloads: ["activity", "heartRate", "sleep", "workoutSamples"],
    status: "planned"
  },
  {
    id: "connector-garmin",
    name: "Garmin data connection",
    transferMode: "both",
    payloads: ["readiness", "trainingLoad", "sleep", "activity"],
    status: "planned"
  }
];

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
