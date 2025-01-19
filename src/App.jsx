import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import DailyProgress from "./components/DailyProgress/DailyProgress";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import { ImportContacts } from "@mui/icons-material";
import SetNewGoal from "./pages/SetNewGoal";
import useExerciseNames from "./stores/useExerciseNames"; // Import Zustand store

function App() {
  const fetchExerciseNames = useExerciseNames(
    (state) => state.fetchExerciseNames
  );

  useEffect(() => {
    // Initialize LocalStorage data if not already present
    const exerciseNames = [
      "Push-Ups",
      "Pull-Ups",
      "Sit-Ups",
      "Squats",
      "Lunges",
      "Plank",
      "Burpees",
      "Mountain Climbers",
      "Jumping Jacks",
      "Crunches",
      "Bicep Curls",
      "Tricep Dips",
      "Deadlifts",
      "Bench Press",
      "Overhead Press",
      "Dumbbell Rows",
      "Leg Press",
      "Calf Raises",
      "Chest Fly",
      "Lat Pulldown",
      "Seated Row",
      "Treadmill Running",
      "Cycling",
      "Elliptical Training",
      "Swimming",
      "Box Jumps",
      "Russian Twists",
      "Side Plank",
      "Jump Rope",
      "High Knees",
    ];
    if (!localStorage.getItem("exerciseNames")) {
      localStorage.setItem("exerciseNames", JSON.stringify(exerciseNames));
    }

    // Fetch exercise names into Zustand store
    fetchExerciseNames();
  }, [fetchExerciseNames]);

  return (
    <>
      <Navbar />
      <div className="tw-p-4 tw-bg-gray-100 tw-min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/set-goal" element={<SetNewGoal />} />
          <Route path="/update-goal" element={<Profile />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
