import React from "react";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";

export default function DailyProgress({ goal, progress }) {
  // Calculate the percentage achieved
  const percentage = Math.min((progress / goal) * 100, 100); // Capping at 100%

  return (
    <div className="tw-w-full tw-p-4 tw-bg-white tw-rounded-lg tw-mt-2">
      <div className="tw-flex tw-justify-between tw-items-center tw-mb-2">
        <Typography className="tw-text-lg tw-font-medium tw-text-gray-700">
          Daily Goal Progress
        </Typography>
        <Typography className="tw-text-sm tw-font-medium tw-text-gray-600">
          {Math.round(percentage)}%
        </Typography>
      </div>
      <div className="tw-relative tw-w-full tw-bg-gray-200 tw-rounded-full tw-h-4">
        {/* Progress Bar */}
        <LinearProgress
          variant="determinate"
          value={percentage}
          className="tw-h-4 tw-rounded-full !tw-bg-gray-200 !tw-text-blue-500"
          sx={{
            "& .MuiLinearProgress-bar": {
              backgroundColor: "#2563eb", // Tailwind's blue-500
            },
          }}
        />
      </div>
      <div className="tw-mt-2 tw-text-sm tw-text-gray-600">
        {progress}/{goal} units completed today
      </div>
    </div>
  );
}
