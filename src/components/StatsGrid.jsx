import React from "react";
import { Paper } from "@mui/material";
import WeeklyStreak from "../components/WeeklyStreak/WeeklyStreak";
import DailyProgress from "../components/DailyProgress/DailyProgress";

const StatsGrid = ({ totalGoal, totalProgress, streakData }) => (
  <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-6">
    <Paper
      elevation={0}
      className="tw-rounded-xl tw-overflow-hidden tw-bg-rose-200/75"
    >
      <WeeklyStreak streakData={streakData} />
    </Paper>
    <Paper
      elevation={0}
      className="tw-rounded-xl tw-overflow-hidden tw-bg-amber-200/75"
    >
      <DailyProgress goal={totalGoal} progress={totalProgress} />
    </Paper>
  </div>
);

export default StatsGrid;
