import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import SetNewGoal from "./pages/SetNewGoal";
import ExerciseGuide from "./pages/ExerciseGuide";
import useExerciseGuideStore from "./stores/useExerciseGuideStore";

function App() {
  const exerciseNames = useExerciseGuideStore((state) => state.exerciseNames);

  useEffect(() => {
    if (!localStorage.getItem("exerciseNames")) {
      localStorage.setItem("exerciseNames", JSON.stringify(exerciseNames));
    }
  }, [exerciseNames]);

  return (
    <div className="tw-min-h-screen tw-bg-gradient-to-br tw-from-blue-50 tw-to-indigo-50">
      <Navbar />
      <div className="tw-container tw-mx-auto tw-px-4 sm:tw-px-6 lg:tw-px-8 tw-py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/set-goal" element={<SetNewGoal />} />
          {/* <Route path="/update-goal" element={<SetNewGoal />} /> */}
          <Route path="/guide" element={<ExerciseGuide />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
