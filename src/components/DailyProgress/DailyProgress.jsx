import React from "react";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

export default function DailyProgress({ goal, progress }) {
  const percentage = goal > 0 ? (progress / goal) * 100 : 0;
  const isCompleted = percentage >= 100;

  return (
    <div className="tw-p-6">
      <div className="tw-space-y-4">
        {/* Header */}
        <div className="tw-flex tw-justify-between tw-items-center">
          <Typography variant="h6" className="tw-font-semibold">
            Daily Goal Progress
          </Typography>
          <div className="tw-flex tw-items-center tw-space-x-2">
            <Typography variant="h5" className="tw-font-bold tw-text-green-600">
              {Math.round(percentage)}%
            </Typography>
            {isCompleted && (
              <EmojiEventsIcon className="tw-text-yellow-500 tw-h-6 tw-w-6" />
            )}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="tw-space-y-2">
          <LinearProgress
            variant="determinate"
            value={percentage}
            className="!tw-h-3 !tw-rounded-full"
            sx={{
              backgroundColor: "#EEF2FF",
              "& .MuiLinearProgress-bar": {
                backgroundColor: "#4caf50",
                borderRadius: "9999px",
              },
            }}
          />
          <div className="tw-flex tw-justify-between tw-items-center">
            <Typography variant="body2" className="tw-text-gray-600">
              Progress: {progress}/{goal} units
            </Typography>
            <Typography
              variant="body2"
              className={`tw-font-medium ${
                isCompleted ? "tw-text-green-600" : "tw-text-gray-600"
              }`}
            >
              {isCompleted
                ? "Goal Completed!"
                : `${goal - progress} units to go`}
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
}
