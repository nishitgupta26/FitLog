import React from "react";
import { Paper, Typography } from "@mui/material";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import WavingHandIcon from "@mui/icons-material/WavingHand";

const WelcomeSection = () => (
  <Paper
    elevation={0}
    className="tw-bg-gradient-to-r tw-from-blue-600 tw-to-indigo-600 tw-rounded-2xl tw-overflow-hidden"
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
);

export default WelcomeSection;
