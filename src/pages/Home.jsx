import React from "react";
import { Paper, Typography } from "@mui/material";
import ExerciseLog from "../components/Exercise Log/ExerciseLog";
import useGoalStore from "../stores/useGoalStore";
import WelcomeSection from "../components/WelcomeSection";
import StatsGrid from "../components/StatsGrid";

export default function Home() {
  const goals = useGoalStore((state) => state.goals);

  const validGoals = goals.filter((goal) => goal.goalValue > 0);
  const totalProgress = validGoals.reduce((acc, goal) => {
    const progressToAdd =
      goal.progress > goal.goalValue ? goal.goalValue : goal.progress;
    return acc + progressToAdd;
  }, 0);

  const totalGoal = validGoals.reduce((acc, goal) => acc + goal.goalValue, 0);

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
          <ExerciseLog mode="progress" />
        </div>
      </Paper>
    </div>
  );
}
