import {
  buildPlanSnapshot,
  clutchTenant,
  demoClient,
  demoDailyDashboard,
  demoExerciseLibrary,
  type Recommendation
} from "@clutch/shared";
import { ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";

const plan = buildPlanSnapshot(demoClient);
const firstWorkout = demoDailyDashboard.trainingPlan.workouts[0];
const firstStep = firstWorkout?.steps[0];
const firstExercise =
  firstStep?.type === "exercise"
    ? demoExerciseLibrary.find((exercise) => exercise.id === firstStep.exerciseId)
    : undefined;
const firstMeal = demoDailyDashboard.mealPlan.meals[0];

export default function App() {
  const nextTouchpoint = plan.coachTouchpoints[0];
  const nextMeeting = demoDailyDashboard.meetings[0];

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <Text style={styles.tenant}>{clutchTenant.name}</Text>
          <Text style={styles.title}>Today's plan is ready.</Text>
          <Text style={styles.subtitle}>
            {demoClient.coachName} has your workout, meals, lifestyle tasks,
            tracking prompts, and check-in ready for {demoDailyDashboard.date}.
          </Text>
        </View>

        {demoDailyDashboard.coachMessage ? (
          <View style={styles.coachCard}>
            <Text style={styles.overline}>Coach message</Text>
            <Text style={styles.cardTitle}>{demoDailyDashboard.coachMessage.title}</Text>
            <Text style={styles.bodyText}>{demoDailyDashboard.coachMessage.body}</Text>
            <Text style={styles.pill}>
              {demoDailyDashboard.coachMessage.channel} message available
            </Text>
          </View>
        ) : null}

        <View style={styles.statusCard}>
          <View>
            <Text style={styles.overline}>Plan status</Text>
            <Text style={styles.status}>{plan.status.replace("_", " ")}</Text>
          </View>
          <View style={styles.confidenceBadge}>
            <Text style={styles.confidenceValue}>{plan.confidenceScore}%</Text>
            <Text style={styles.confidenceLabel}>confidence</Text>
          </View>
        </View>

        <View style={styles.metricGrid}>
          <Metric label="Readiness" value={demoClient.wearable.readinessScore} />
          <Metric label="Sleep" value={demoClient.wearable.sleepScore} />
          <Metric
            label="Resting HR"
            value={demoClient.wearable.averageRestingHeartRate}
            suffix="bpm"
          />
        </View>

        {firstWorkout ? (
          <View style={styles.planCard}>
            <View style={styles.inlineHeader}>
              <View>
                <Text style={styles.overline}>Training plan</Text>
                <Text style={styles.cardTitle}>{firstWorkout.name}</Text>
              </View>
              <Text style={styles.pill}>
                {firstWorkout.lockedByCoach ? "Locked" : "Editable"}
              </Text>
            </View>
            <Text style={styles.bodyText}>{firstWorkout.description}</Text>
            <View style={styles.actionBox}>
              <Text style={styles.actionTitle}>Workout execution</Text>
              <Text style={styles.actionText}>
                {firstWorkout.expectedDurationMinutes} minutes in the{" "}
                {firstWorkout.timeOfDay}; {firstWorkout.steps.length} ordered
                exercise/rest steps with play, pause, skip, and restart planned.
              </Text>
              {firstExercise ? (
                <Text style={styles.actionText}>
                  First exercise: {firstExercise.name} using{" "}
                  {firstExercise.equipmentRequired.join(", ")}.
                </Text>
              ) : null}
            </View>
          </View>
        ) : null}

        {firstMeal ? (
          <View style={styles.planCard}>
            <Text style={styles.overline}>Meal plan</Text>
            <Text style={styles.cardTitle}>{firstMeal.name}</Text>
            <Text style={styles.bodyText}>{firstMeal.description}</Text>
            <View style={styles.actionBox}>
              <Text style={styles.actionTitle}>
                {firstMeal.calories} calories / {firstMeal.proteinGrams}g protein
              </Text>
              <Text style={styles.actionText}>
                {firstMeal.servings} serving, {firstMeal.preparationTimeMinutes}
                min prep. Ingredients scale when servings change.
              </Text>
              <Text style={styles.actionText}>
                Favorite: {firstMeal.isFavorite ? "yes" : "no"}; completed:{" "}
                {firstMeal.completed ? "yes" : "no"}.
              </Text>
            </View>
          </View>
        ) : null}

        <View style={styles.planCard}>
          <Text style={styles.overline}>Lifestyle checklist</Text>
          <Text style={styles.cardTitle}>Daily recommendations</Text>
          {demoDailyDashboard.lifestylePlan.recommendations.map((recommendation) => (
            <View key={recommendation.id} style={styles.checklistItem}>
              <Text style={styles.checkMark}>
                {recommendation.completedToday ? "Done" : "Open"}
              </Text>
              <Text style={styles.bodyText}>{recommendation.recommendation}</Text>
            </View>
          ))}
        </View>

        <View style={styles.planCard}>
          <Text style={styles.overline}>Results tracking</Text>
          <Text style={styles.cardTitle}>Today's prompts</Text>
          {demoDailyDashboard.measurementPrompts.map((prompt) => (
            <View key={prompt.id} style={styles.checklistItem}>
              <Text style={prompt.overdue ? styles.overduePill : styles.pill}>
                {prompt.overdue ? "Overdue" : prompt.interval.replaceAll("_", " ")}
              </Text>
              <Text style={styles.bodyText}>
                {prompt.label}
                {prompt.lastValue ? ` - last: ${prompt.lastValue}` : ""}
              </Text>
            </View>
          ))}
        </View>

        <PlanCard
          title="Nutrition focus"
          summary={`${plan.nutrition.calories}. ${plan.nutrition.mealTiming}`}
          recommendation={plan.nutrition.recommendations[0]}
        />

        <PlanCard
          title="Training focus"
          summary={plan.training.weeklyStructure}
          recommendation={plan.training.recommendations[0]}
        />

        {nextTouchpoint ? (
          <View style={styles.coachCard}>
            <Text style={styles.overline}>Next coach check-in</Text>
            <Text style={styles.cardTitle}>{nextTouchpoint.cadence}</Text>
            <Text style={styles.bodyText}>{nextTouchpoint.messagePrompt}</Text>
          </View>
        ) : null}

        {nextMeeting ? (
          <View style={styles.coachCard}>
            <Text style={styles.overline}>Scheduled meeting</Text>
            <Text style={styles.cardTitle}>{nextMeeting.title}</Text>
            <Text style={styles.bodyText}>
              {nextMeeting.format} consultation with a reminder{" "}
              {nextMeeting.reminderMinutesBefore} minutes before start.
            </Text>
          </View>
        ) : null}

        <View style={styles.safetyCard}>
          <Text style={styles.overline}>Important note</Text>
          {plan.safetyNotes.slice(0, 2).map((note) => (
            <Text key={note} style={styles.safetyText}>
              {note}
            </Text>
          ))}
        </View>
      </ScrollView>
    </View>
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
    <View style={styles.metricCard}>
      <Text style={styles.metricLabel}>{label}</Text>
      <Text style={styles.metricValue}>
        {value}
        {suffix ? <Text style={styles.metricSuffix}> {suffix}</Text> : null}
      </Text>
    </View>
  );
}

function PlanCard({
  title,
  summary,
  recommendation
}: {
  title: string;
  summary: string;
  recommendation: Recommendation | undefined;
}) {
  return (
    <View style={styles.planCard}>
      <Text style={styles.overline}>This week</Text>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.bodyText}>{summary}</Text>
      {recommendation ? (
        <View style={styles.actionBox}>
          <Text style={styles.actionTitle}>{recommendation.title}</Text>
          {recommendation.actions.slice(0, 2).map((action) => (
            <Text key={action} style={styles.actionText}>
              - {action}
            </Text>
          ))}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#111827",
    flex: 1
  },
  content: {
    gap: 16,
    padding: 20,
    paddingBottom: 40
  },
  hero: {
    gap: 10,
    paddingBottom: 8,
    paddingTop: 36
  },
  tenant: {
    color: "#22c55e",
    fontSize: 13,
    fontWeight: "800",
    letterSpacing: 1.2,
    textTransform: "uppercase"
  },
  title: {
    color: "#f9fafb",
    fontSize: 34,
    fontWeight: "800",
    lineHeight: 40
  },
  subtitle: {
    color: "#cbd5e1",
    fontSize: 16,
    lineHeight: 24
  },
  statusCard: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 28,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 18
  },
  overline: {
    color: "#2563eb",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1,
    marginBottom: 6,
    textTransform: "uppercase"
  },
  status: {
    color: "#111827",
    fontSize: 22,
    fontWeight: "800",
    textTransform: "capitalize"
  },
  confidenceBadge: {
    alignItems: "center",
    backgroundColor: "#dcfce7",
    borderRadius: 24,
    paddingHorizontal: 14,
    paddingVertical: 12
  },
  confidenceValue: {
    color: "#15803d",
    fontSize: 22,
    fontWeight: "900"
  },
  confidenceLabel: {
    color: "#166534",
    fontSize: 11,
    fontWeight: "700"
  },
  metricGrid: {
    flexDirection: "row",
    gap: 10
  },
  metricCard: {
    backgroundColor: "#1f2937",
    borderColor: "#374151",
    borderRadius: 22,
    borderWidth: 1,
    flex: 1,
    padding: 14
  },
  metricLabel: {
    color: "#9ca3af",
    fontSize: 12,
    marginBottom: 6
  },
  metricValue: {
    color: "#f9fafb",
    fontSize: 24,
    fontWeight: "900"
  },
  metricSuffix: {
    color: "#9ca3af",
    fontSize: 12,
    fontWeight: "700"
  },
  planCard: {
    backgroundColor: "#ffffff",
    borderRadius: 28,
    gap: 10,
    padding: 18
  },
  cardTitle: {
    color: "#111827",
    fontSize: 24,
    fontWeight: "800"
  },
  bodyText: {
    color: "#475569",
    fontSize: 15,
    lineHeight: 23
  },
  actionBox: {
    backgroundColor: "#f8fafc",
    borderRadius: 18,
    gap: 6,
    marginTop: 4,
    padding: 14
  },
  actionTitle: {
    color: "#111827",
    fontSize: 16,
    fontWeight: "800"
  },
  actionText: {
    color: "#475569",
    fontSize: 14,
    lineHeight: 21
  },
  coachCard: {
    backgroundColor: "#dbeafe",
    borderRadius: 28,
    gap: 8,
    padding: 18
  },
  inlineHeader: {
    alignItems: "flex-start",
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-between"
  },
  pill: {
    alignSelf: "flex-start",
    backgroundColor: "#dbeafe",
    borderRadius: 999,
    color: "#1d4ed8",
    fontSize: 12,
    fontWeight: "800",
    overflow: "hidden",
    paddingHorizontal: 10,
    paddingVertical: 5,
    textTransform: "capitalize"
  },
  overduePill: {
    alignSelf: "flex-start",
    backgroundColor: "#fee2e2",
    borderRadius: 999,
    color: "#b91c1c",
    fontSize: 12,
    fontWeight: "800",
    overflow: "hidden",
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  checklistItem: {
    backgroundColor: "#f8fafc",
    borderRadius: 18,
    gap: 8,
    marginTop: 10,
    padding: 12
  },
  checkMark: {
    alignSelf: "flex-start",
    backgroundColor: "#dcfce7",
    borderRadius: 999,
    color: "#166534",
    fontSize: 12,
    fontWeight: "800",
    overflow: "hidden",
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  safetyCard: {
    backgroundColor: "#fff7ed",
    borderColor: "#fed7aa",
    borderRadius: 24,
    borderWidth: 1,
    gap: 8,
    padding: 16
  },
  safetyText: {
    color: "#9a3412",
    fontSize: 13,
    lineHeight: 20
  }
});
