import React, { useState, useEffect } from "react";
import {
  Typography,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import GoalIllustration from "../assets/goal_illustration.svg";
import ExerciseLog from "../components/Exercise Log/ExerciseLog";
import axios from "axios";
import dayjs from "dayjs";
import Cookies from "js-cookie";

import useGoalUpdateStore from "../stores/useGoalUpdateStore";

export default function SetNewGoal() {
  const [resetDialogOpen, setResetDialogOpen] = useState(false);
  const [goals, setGoals] = useState([]);

  const goalsUpdated = useGoalUpdateStore((state) => state.goalsUpdated);
  const toggleGoalsUpdated = useGoalUpdateStore(
    (state) => state.toggleGoalsUpdated
  );
  useEffect(() => {
    const fetchGoals = async () => {
      const currentDate = dayjs().format("YYYY-MM-DD");
      const token = Cookies.get("token");
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/goals/${currentDate}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const goalsArray = response.data.map((group) =>
          group.reduce((acc, { Key, Value }) => {
            acc[Key] = Value;
            return acc;
          }, {})
        );
        setGoals(goalsArray);
        // console.log("Goals fetched successfully:", response.data);
      } catch (error) {
        console.error("Error fetching goals:", error);
      }
    };

    fetchGoals();
  }, [goalsUpdated]);
  // console.log("Goals:", goals);

  const handleResetConfirm = async () => {
    const currentDate = dayjs().format("YYYY-MM-DD");
    const token = Cookies.get("token");
    try {
      await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/goals/${currentDate}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setGoals([]);
      setResetDialogOpen(false);
    } catch (error) {
      console.error("Error resetting goals:", error);
    }
  };

  return (
    <div className="tw-min-h-screen">
      <Paper
        elevation={0}
        className=" tw-bg-white tw-max-w-full tw-mx-auto tw-px-4 sm:tw-px-6 lg:tw-px-8 tw-py-4 sm:tw-py-6 lg:tw-py-8"
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
            <div className="tw-p-6 sm:tw-p-8 tw-border-b tw-border-gray-100 tw-bg-blue-200 tw-rounded-t-2xl">
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
                {goals.length > 0 && (
                  <Button
                    variant="outlined"
                    color="error"
                    startIcon={<RestartAltIcon />}
                    onClick={() => setResetDialogOpen(true)}
                    className="tw-whitespace-nowrap"
                  >
                    Reset All Goals
                  </Button>
                )}
              </div>
            </div>

            <div className="tw-p-6 sm:tw-p-8">
              <ExerciseLog mode="goal" />
            </div>
          </div>
        </div>
      </Paper>

      {/* Reset Confirmation Dialog */}
      <Dialog
        open={resetDialogOpen}
        onClose={() => setResetDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle className="tw-text-red-600">Reset All Goals?</DialogTitle>
        <DialogContent>
          <Typography variant="body1" className="tw-text-gray-600">
            This will reset all your goal values to zero. Your progress for each
            exercise will remain unchanged. Goals with both zero progress and
            zero goals will be removed automatically. This action cannot be
            undone.
          </Typography>
        </DialogContent>
        <DialogActions className="tw-p-6">
          <Button onClick={() => setResetDialogOpen(false)} variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={handleResetConfirm}
            variant="contained"
            color="error"
          >
            Reset Goals
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
