import React from "react";
import { Paper, Typography } from "@mui/material";
import WeeklyStreak from "../components/WeeklyStreak/WeeklyStreak";
import DailyProgress from "../components/DailyProgress/DailyProgress";
import ExerciseLog from "../components/Exercise Log/ExerciseLog";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import useGoalStore from "../stores/useGoalStore";

export default function Home() {
  const goals = useGoalStore((state) => state.goals);
  const updateGoalProgress = useGoalStore((state) => state.updateGoalProgress);
  const deleteGoal = useGoalStore((state) => state.deleteGoal);

  const handleAddLog = (log) => {
    updateGoalProgress(log.id, log.value);
  };

  const handleDeleteLog = (id) => {
    deleteGoal(id);
  };

  const totalProgress = goals.reduce((acc, goal) => acc + goal.progress, 0);
  const totalGoal = goals.reduce((acc, goal) => acc + goal.value, 0);
  const progressPercentage =
    totalGoal > 0 ? (totalProgress / totalGoal) * 100 : 0;

  return (
    <div className="tw-space-y-6">
      {/* Welcome Section */}
      <Paper
        elevation={0}
        className="tw-bg-gradient-to-r tw-from-blue-600 tw-to-indigo-600 tw-rounded-2xl tw-overflow-hidden"
      >
        <div className="tw-px-6 tw-py-8 sm:tw-px-8 sm:tw-py-10 tw-flex tw-flex-col sm:tw-flex-row tw-items-center tw-justify-between">
          <div className="tw-text-white tw-space-y-2 tw-text-center sm:tw-text-left">
            <Typography variant="h4" className="tw-font-bold">
              Welcome to FitLog
            </Typography>
            <Typography variant="subtitle1" className="tw-opacity-90">
              Track your fitness journey and achieve your goals!
            </Typography>
          </div>
          <div className="tw-mt-6 sm:tw-mt-0">
            <FitnessCenterIcon className="tw-text-white tw-opacity-20 tw-w-24 tw-h-24" />
          </div>
        </div>
      </Paper>

      {/* Stats Grid */}
      <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-6">
        <Paper elevation={0} className="tw-rounded-xl tw-overflow-hidden">
          <WeeklyStreak
            streakData={[true, false, true, true, false, true, true]}
          />
        </Paper>
        <Paper elevation={0} className="tw-rounded-xl tw-overflow-hidden">
          <DailyProgress goal={totalGoal} progress={totalProgress} />
        </Paper>
      </div>

      {/* Exercise Log Section */}
      <Paper elevation={0} className="tw-rounded-xl tw-overflow-hidden">
        <div className="tw-p-6">
          <Typography variant="h6" className="tw-font-semibold tw-mb-4">
            Today's Progress
          </Typography>
          <ExerciseLog
            logs={goals}
            onAddLog={handleAddLog}
            onDeleteLog={handleDeleteLog}
            mode="progress"
          />
        </div>
      </Paper>
    </div>
  );
}
