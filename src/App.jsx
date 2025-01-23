import React, { useEffect, lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Loading from "./components/Loading/Loading";
import useExerciseGuideStore from "./stores/useExerciseGuideStore";
import { useState } from 'react';
import { ThemeProvider, CssBaseline, Button } from '@mui/material';
import { lightTheme, darkTheme } from './theme';
import { getInitialTheme, saveTheme } from './utils/themeStorage';

const Home = lazy(() => import("./pages/Home"));
const Profile = lazy(() => import("./pages/Profile"));
const SetNewGoal = lazy(() => import("./pages/SetNewGoal"));
const ExerciseGuide = lazy(() => import("./pages/ExerciseGuide"));

function App() {
  const exerciseNames = useExerciseGuideStore((state) => state.exerciseNames);

  useEffect(() => {
    if (!localStorage.getItem("exerciseNames")) {
      localStorage.setItem("exerciseNames", JSON.stringify(exerciseNames));
    }
  }, [exerciseNames]);
  const [isDarkMode, setIsDarkMode] = useState(getInitialTheme);

  useEffect(() => {
    saveTheme(isDarkMode);
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };
  return (
    
    <div className="tw-min-h-screen tw-bg-gradient-to-br tw-from-blue-50 tw-to-indigo-50">
      <Navbar />
      <div className="tw-container tw-mx-auto tw-px-4 sm:tw-px-6 lg:tw-px-8 tw-py-6">
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/set-goal" element={<SetNewGoal />} />
            <Route path="/guide" element={<ExerciseGuide />} />
            {/* <Route path="/loading" element={<Loading />} /> */}
          </Routes>
        </Suspense>
      </div>
    </div>
    
  );
}

export default App;
