import React from "react";
import { Paper, Typography } from "@mui/material";
import WeeklyStreak from "../components/WeeklyStreak/WeeklyStreak";
import DailyProgress from "../components/DailyProgress/DailyProgress";
import ExerciseLog from "../components/Exercise Log/ExerciseLog";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import WavingHandIcon from "@mui/icons-material/WavingHand";
import useGoalStore from "../stores/useGoalStore";

export default function Home() {
  const goals = useGoalStore((state) => state.goals);
  const updateGoalProgress = useGoalStore((state) => state.updateGoalProgress);
  const deleteGoal = useGoalStore((state) => state.deleteGoal);

  const handleAddLog = (log) => {
    updateGoalProgress(log.id, log.value);
  };

  const handleDeleteLog = (id) => {
    deleteGoal(id, "progress");
  };

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
      <Paper
        elevation={0}
        className="tw-bg-white tw-bg-gradient-to-r tw-from-blue-600 tw-to-indigo-600 tw-rounded-2xl tw-overflow-hidden"
      >
        <div className="tw-px-6 tw-py-8 sm:tw-px-8 sm:tw-py-10 tw-flex tw-flex-col sm:tw-flex-row tw-items-center tw-justify-between">
          <div className="tw-text-white tw-space-y-2 tw-text-center sm:tw-text-left">
            <Typography variant="h4" className="tw-font-bold">
              Welcome to FitLog
              <WavingHandIcon
                sx={{ marginLeft: "8px", color: "#FFA500", fontSize: 28 }}
              />
            </Typography>
            <Typography variant="subtitle1" className="tw-opacity-90">
              Track your fitness journey and achieve your goals!
            </Typography>
          </div>
          <div className="tw-hidden sm:tw-block tw-mt-6 sm:tw-mt-0">
            <FitnessCenterIcon className="tw-text-orange-400 tw-w-24 tw-h-24" />
          </div>
        </div>
      </Paper>

      {/* Stats Grid */}
      <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-6">
        <Paper
          elevation={0}
          className="tw-rounded-xl tw-overflow-hidden tw-bg-pink-200"
        >
          <WeeklyStreak
            streakData={[true, false, true, true, false, true, true]}
          />
        </Paper>
        <Paper
          elevation={0}
          className="tw-rounded-xl tw-overflow-hidden tw-bg-yellow-200"
        >
          <DailyProgress goal={totalGoal} progress={totalProgress} />
        </Paper>
      </div>

      {/* Exercise Log Section */}
      <Paper
        elevation={0}
        className="tw-rounded-xl tw-overflow-hidden tw-bg-blue-200"
      >
        <div className="tw-p-6">
          <Typography variant="h6" className="tw-font-semibold tw-mb-4">
            Today's Progress
          </Typography>
          <ExerciseLog
            goals={goals}
            onAddLog={handleAddLog}
            onDeleteLog={handleDeleteLog}
            mode="progress"
          />
        </div>
      </Paper>
    </div>
  );
}
