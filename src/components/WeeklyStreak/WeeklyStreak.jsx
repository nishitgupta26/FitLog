import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { Typography } from "@mui/material";

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function WeeklyStreak({ streakData, targetDayIndex }) {
  const calculateStreak = () => {
    if (!streakData || !streakData.length) return 0;

    // Count consecutive trues backwards from targetDayIndex
    let recentCount = 0;
    for (let i = targetDayIndex; i >= 0; i--) {
      if (streakData[i]) {
        recentCount++;
      } else {
        break; // Stop at first false
      }
    }

    // Return the larger of the two counts
    return recentCount;
  };

  const currentStreak = calculateStreak();

  return (
    <div className="tw-p-6">
      <div className="tw-flex tw-flex-col tw-space-y-6">
        {/* Header with Streak Count */}
        <div className="tw-flex tw-justify-between tw-items-center">
          <Typography variant="h6" className="tw-font-semibold">
            Weekly Streak
          </Typography>
          <div className="tw-bg-green-200 tw-px-4 tw-py-1 tw-rounded-full">
            <Typography variant="subtitle2" className="tw-text-green-700">
              {currentStreak} Day Streak
            </Typography>
          </div>
        </div>

        {/* Streak Calendar */}
        <div className="tw-grid tw-grid-cols-7 tw-gap-2">
          {daysOfWeek.map((day, index) => (
            <div
              key={day}
              className="tw-flex tw-flex-col tw-items-center tw-space-y-2"
            >
              <Typography
                variant="caption"
                className="tw-font-medium tw-text-gray-600"
              >
                {day}
              </Typography>
              {streakData[index] ? (
                <div className="tw-bg-blue-100 tw-rounded-full tw-p-1">
                  <CheckCircleIcon className="tw-text-green-600 tw-h-6 tw-w-6" />
                </div>
              ) : (
                <div className="tw-bg-gray-100 tw-rounded-full tw-p-1">
                  <RadioButtonUncheckedIcon className="tw-text-gray-400 tw-h-6 tw-w-6" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
