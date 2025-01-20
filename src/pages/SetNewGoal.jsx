import React from "react";
import { Typography, Paper } from "@mui/material";
import GoalIllustration from "../assets/goal_illustration.svg";
import ExerciseLog from "../components/Exercise Log/ExerciseLog";
import useGoalStore from "../stores/useGoalStore";

export default function SetNewGoal() {
  const addGoal = useGoalStore((state) => state.addGoal);
  const goals = useGoalStore((state) => state.goals);
  const deleteGoal = useGoalStore((state) => state.deleteGoal);

  const handleAddLog = (newLog) => {
    addGoal(newLog);
  };

  const handleDeleteLog = (id) => {
    deleteGoal(id);
  };

  return (
    <div className="tw-min-h-screen">
      <Paper
        elevation={0}
        className="tw-max-w-full tw-mx-auto tw-px-4 sm:tw-px-6 lg:tw-px-8 tw-py-4 sm:tw-py-6 lg:tw-py-8"
      >
        <div className="tw-space-y-6 sm:tw-space-y-8 lg:tw-space-y-12">
          {/* Header Section */}
          <div className="tw-flex tw-flex-col lg:tw-flex-row tw-items-center tw-justify-between tw-gap-8">
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
                    {goals.length === 0
                      ? "Start by adding exercises to your goal"
                      : `${goals.length} exercise${
                          goals.length === 1 ? "" : "s"
                        } added to your goal`}
                  </Typography>
                </div>
              </div>
            </div>

            <div className="tw-p-6 sm:tw-p-8">
              <ExerciseLog
                logs={goals}
                onAddLog={handleAddLog}
                onDeleteLog={handleDeleteLog}
                mode="goal"
              />

              {goals.length === 0 && (
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
