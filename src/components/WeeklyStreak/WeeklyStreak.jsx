import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function WeeklyStreak({ streakData }) {
  return (
    <div className="tw-bg-white tw-shadow-md tw-rounded-lg tw-p-4 tw-w-full tw-mx-auto tw-mt-2">
      <div className="tw-flex tw-flex-col md:tw-flex-row tw-justify-between tw-items-center md:tw-items-start">
        {/* Header Text */}
        <h3 className="tw-text-lg tw-font-semibold tw-text-gray-700 tw-mb-4 md:tw-mb-0">
          Weekly Streak
        </h3>

        {/* Streak Days */}
        <div className="tw-flex tw-justify-between tw-w-2/3 tw-flex-wrap md:tw-flex-nowrap">
          {daysOfWeek.map((day, index) => (
            <div
              key={index}
              className="tw-flex tw-flex-col tw-items-center tw-mb-2 md:tw-mb-0"
            >
              {/* Day of the Week */}
              <span className="tw-text-xs tw-font-medium tw-text-gray-600">
                {day}
              </span>
              {/* Streak Indicator */}
              {streakData[index] ? (
                <CheckCircleIcon className="tw-text-blue-500 tw-mt-1 tw-h-6 tw-w-6" />
              ) : (
                <RadioButtonUncheckedIcon className="tw-text-gray-400 tw-mt-1 tw-h-6 tw-w-6" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
