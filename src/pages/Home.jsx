import React, { useState } from "react";
import WeeklyStreak from "../components/WeeklyStreak/WeeklyStreak";
import DailyProgress from "../components/DailyProgress/DailyProgress";
import ExerciseLog from "../components/Exercise Log/ExerciseLog";

export default function Home({ goal, progress }) {
  const sampleStreak = [true, false, true, true, false, true, true]; // Example data
  const [logs, setLogs] = useState([]);

  const handleAddLog = (newLog) => {
    setLogs([...logs, newLog]);
  };

  const handleDeleteLog = (id) => {
    setLogs(logs.filter((log) => log.id !== id));
  };

  return (
    <>
      {/* <Navbar /> */}
      <WeeklyStreak streakData={sampleStreak} />
      <DailyProgress goal={100} progress={30} />
      <ExerciseLog
        logs={logs}
        onAddLog={handleAddLog}
        onDeleteLog={handleDeleteLog}
      />
    </>
  );
}
