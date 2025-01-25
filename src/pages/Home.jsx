import React from "react";
import { Paper, Typography } from "@mui/material";
import WeeklyStreak from "../components/WeeklyStreak/WeeklyStreak";
import DailyProgress from "../components/DailyProgress/DailyProgress";
import ExerciseLog from "../components/Exercise Log/ExerciseLog";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import WavingHandIcon from "@mui/icons-material/WavingHand";
import useGoalStore from "../stores/useGoalStore";
import WelcomeSection from "../components/WelcomeSection";
import StatsGrid from "../components/StatsGrid";

export default function Home() {
  const goals = useGoalStore((state) => state.goals);
  const updateGoalProgress = useGoalStore((state) => state.updateGoalProgress);
  const deleteGoal = useGoalStore((state) => state.deleteGoal);

  const validGoals = goals.filter((goal) => goal.goalValue > 0);
  const totalProgress = validGoals.reduce((acc, goal) => {
    const progressToAdd =
      goal.progress > goal.goalValue ? goal.goalValue : goal.progress;
    return acc + progressToAdd;
  }, 0);

  const totalGoal = validGoals.reduce((acc, goal) => acc + goal.goalValue, 0);
  const progressPercentage =
    totalGoal > 0 ? (totalProgress / totalGoal) * 100 : 0;

  return (
    <div className="tw-space-y-6">
      {/* Welcome Section */}
      <WelcomeSection />
      {/* Stats Grid */}
      <StatsGrid totalGoal={totalGoal} totalProgress={totalProgress} />

      {/* Exercise Log Section */}
      <Paper
        elevation={0}
        className="tw-rounded-xl tw-overflow-hidden tw-bg-blue-200"
      >
        <div className="tw-p-6">
          <Typography variant="h6" className="tw-font-semibold tw-mb-4">
            Today's Progress
          </Typography>
          <ExerciseLog goals={goals} mode="progress" />
        </div>
      </Paper>
    </div>
  );
}
