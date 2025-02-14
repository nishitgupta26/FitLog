import React, { useState, useEffect } from "react";
import { Paper, Typography } from "@mui/material";
import ExerciseLog from "../components/Exercise Log/ExerciseLog";
import useGoalUpdateStore from "../stores/useGoalUpdateStore";
import WelcomeSection from "../components/WelcomeSection";
import StatsGrid from "../components/StatsGrid";
import axios from "axios";
import Cookies from "js-cookie";
import dayjs from "dayjs";

export default function Home() {
  const [totalProgress, setTotalProgress] = useState(0);
  const [totalGoal, setTotalGoal] = useState(0);
  const [lastGoalAchieved, setLastGoalAchieved] = useState(null);
  const goalsUpdated = useGoalUpdateStore((state) => state.goalsUpdated);
  const [streakData, setStreakData] = useState([]);

  // Fetch streak data
  const fetchStreak = async () => {
    const currentDate = dayjs().format("YYYY-MM-DD");
    const token = Cookies.get("token");
    try {
      const response = await axios.get(
        `http://localhost:8080/api/progress/streak/${currentDate}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const streakArray = Array.isArray(response.data)
        ? response.data
        : [response.data];

      setStreakData(streakArray);
      // console.log("Streak data response:", response.data);
      // console.log("Streak data:", streakData);
    } catch (error) {
      console.error("Error fetching streak:", error);
    }
  };

  useEffect(() => {
    console.log("Updated streak data:", streakData);
  }, [streakData]);

  useEffect(() => {
    const fetchProgress = async () => {
      const currentDate = dayjs().format("YYYY-MM-DD");
      const token = Cookies.get("token");
      try {
        const response = await axios.get(
          `http://localhost:8080/api/progress/${currentDate}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data) {
          setTotalProgress(response.data.totalProgress);
          setTotalGoal(response.data.totalGoal);
        }
      } catch (error) {
        console.error("Error fetching progress:", error);
      }
    };

    fetchProgress();
    fetchStreak();
  }, [goalsUpdated]);

  useEffect(() => {
    const isCurrentlyAchieved = totalProgress >= totalGoal;

    // Only fetch if achievement status has changed
    if (lastGoalAchieved !== null && lastGoalAchieved !== isCurrentlyAchieved) {
      fetchStreak();
    }

    setLastGoalAchieved(isCurrentlyAchieved);
  }, [totalProgress, totalGoal]);

  return (
    <div className="tw-space-y-6">
      {/* Welcome Section */}
      <WelcomeSection />
      {/* Stats Grid */}
      <StatsGrid
        totalGoal={totalGoal}
        totalProgress={totalProgress}
        streakData={streakData}
      />

      {/* Exercise Log Section */}
      <Paper
        elevation={0}
        className="tw-rounded-xl tw-overflow-hidden tw-bg-blue-200"
      >
        <div className="tw-p-6">
          <Typography variant="h6" className="tw-font-semibold tw-mb-4">
            Today's Progress
          </Typography>
          <ExerciseLog mode="progress" />
        </div>
      </Paper>
    </div>
  );
}
