import React from "react";
import Navbar from "../components/Navbar/Navbar";
import DailyProgress from "../components/DailyProgress/DailyProgress";
import WeeklyStreak from "../components/WeeklyStreak/WeeklyStreak";
import ExerciseLog from "../components/Exercise Log/ExerciseLog";

export default function Home({ goal, progress }) {
  const sampleStreak = [true, false, true, true, false, true, true]; // Example data
  return (
    <>
      <Navbar />
      <WeeklyStreak streakData={sampleStreak} />
      <DailyProgress goal={100} progress={30} />
      <ExerciseLog />
    </>
  );
}
