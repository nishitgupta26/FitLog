import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { Typography, Paper } from "@mui/material";
import GoalIllustration from "../assets/goal_illustration.svg";
import ExerciseLog from "../components/Exercise Log/ExerciseLog";

export default function SetNewGoal() {
  const [logs, setLogs] = useState([]);

  const handleAddLog = (newLog) => {
    setLogs([...logs, newLog]);
  };

  const handleDeleteLog = (id) => {
    setLogs(logs.filter((log) => log.id !== id));
  };

  return (
    <div className="tw-min-h-screen ">
      <Paper
        elevation={0}
        className="tw-max-w-full tw-mx-auto tw-px-4 sm:tw-px-6 lg:tw-px-8 tw-py-4 sm:tw-py-6 lg:tw-py-8"
      >
        <div className="tw-space-y-6 sm:tw-space-y-8 lg:tw-space-y-12">
          {/* Header Section with Responsive Layout */}
          <div className="tw-flex tw-flex-col lg:tw-flex-row tw-items-center tw-justify-between tw-gap-8">
            {/* Text Content */}
            <div className="tw-flex-1 tw-text-center lg:tw-text-left tw-space-y-4">
              <Typography
                variant="h3"
                className="tw-font-bold tw-text-blue-600 tw-text-3xl sm:tw-text-4xl lg:tw-text-5xl"
              >
                Set Your New Fitness Goal
              </Typography>

              <Typography
                variant="body1"
                className="tw-text-gray-600 tw-max-w-2xl tw-mx-auto lg:tw-mx-0 tw-text-sm sm:tw-text-base"
              >
                Define your fitness journey by adding specific exercises to your
                goal. Track your progress and celebrate your achievements along
                the way!
              </Typography>
            </div>

            {/* Illustration */}
            <div className="tw-flex-1 tw-flex tw-justify-center lg:tw-justify-end">
              <img
                src={GoalIllustration}
                alt="Set Goal Illustration"
                className="tw-w-full tw-max-w-md lg:tw-max-w-lg tw-h-auto tw-object-contain"
              />
            </div>
          </div>

          {/* Main Content Section */}
          <div className="tw-bg-white tw-rounded-2xl tw-shadow-sm tw-border tw-border-gray-100">
            {/* Progress Indicator */}
            <div className="tw-p-6 sm:tw-p-8 tw-border-b tw-border-gray-100">
              <div className="tw-flex tw-flex-col sm:tw-flex-row tw-items-center tw-justify-between tw-gap-4">
                <div className="tw-space-y-2">
                  <Typography
                    variant="h6"
                    className="tw-font-semibold tw-text-gray-900"
                  >
                    Your Goals
                  </Typography>
                  <Typography variant="body2" className="tw-text-gray-500">
                    {logs.length === 0
                      ? "Start by adding exercises to your goal"
                      : `${logs.length} exercise${
                          logs.length === 1 ? "" : "s"
                        } added to your goal`}
                  </Typography>
                </div>
              </div>
            </div>

            {/* Exercise Log Component */}
            <div className="tw-p-6 sm:tw-p-8">
              <ExerciseLog
                logs={logs}
                onAddLog={handleAddLog}
                onDeleteLog={handleDeleteLog}
              />

              {/* Quick Tips */}
              {logs.length === 0 && (
                <div className="tw-mt-8 tw-bg-blue-50 tw-rounded-xl tw-p-4 sm:tw-p-6">
                  <Typography
                    variant="subtitle2"
                    className="tw-font-semibold tw-text-blue-800 tw-mb-2"
                  >
                    Quick Tips:
                  </Typography>
                  <ul className="tw-space-y-2 tw-text-sm tw-text-blue-700">
                    <li>• Start with 3-5 exercises for a balanced goal</li>
                    <li>• Mix cardio and strength exercises</li>
                    <li>• Set realistic repetitions or durations</li>
                    <li>• Add notes to track specific targets</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </Paper>
    </div>
  );
}
