import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import SetNewGoal from "./pages/SetNewGoal";
import ExerciseGuide from "./pages/ExerciseGuide";
import useExerciseNames from "./stores/useExerciseNames";

function App() {
  const fetchExerciseNames = useExerciseNames(
    (state) => state.fetchExerciseNames
  );

  useEffect(() => {
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
    fetchExerciseNames();
  }, [fetchExerciseNames]);

  return (
    <div className="tw-min-h-screen tw-bg-gradient-to-br tw-from-blue-50 tw-to-indigo-50">
      <Navbar />
      <div className="tw-container tw-mx-auto tw-px-4 sm:tw-px-6 lg:tw-px-8 tw-py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/set-goal" element={<SetNewGoal />} />
          <Route path="/update-goal" element={<SetNewGoal />} />
          <Route path="/guide" element={<ExerciseGuide />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
