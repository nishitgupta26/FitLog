import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import DailyProgress from "./components/DailyProgress/DailyProgress";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import { ImportContacts } from "@mui/icons-material";

function App() {
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

    // Store exercise names in LocalStorage if not already present
    if (!localStorage.getItem("exerciseNames")) {
      localStorage.setItem("exerciseNames", JSON.stringify(exerciseNames));
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className="tw-p-4 tw-bg-gray-100 tw-min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
