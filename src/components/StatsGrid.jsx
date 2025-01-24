import React from "react";
import { Paper } from "@mui/material";
import WeeklyStreak from "../components/WeeklyStreak/WeeklyStreak";
import DailyProgress from "../components/DailyProgress/DailyProgress";

const StatsGrid = ({ totalGoal, totalProgress }) => (
  <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-6">
    <Paper
      elevation={0}
      className="tw-rounded-xl tw-overflow-hidden tw-bg-pink-200"
    >
      <WeeklyStreak streakData={[true, false, true, true, false, true, true]} />
    </Paper>
    <Paper
      elevation={0}
      className="tw-rounded-xl tw-overflow-hidden tw-bg-yellow-200"
    >
      <DailyProgress goal={totalGoal} progress={totalProgress} />
    </Paper>
  </div>
);

export default StatsGrid;
