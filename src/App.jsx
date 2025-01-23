import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import SetNewGoal from "./pages/SetNewGoal";
import ExerciseGuide from "./pages/ExerciseGuide";
import useExerciseGuideStore from "./stores/useExerciseGuideStore";
import { useState } from 'react';
import { ThemeProvider, CssBaseline, Button } from '@mui/material';
import { lightTheme, darkTheme } from './theme';
import { getInitialTheme, saveTheme } from './utils/themeStorage';

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
      <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
     
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <Button variant="contained" onClick={toggleTheme}>
            {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          </Button>
          </div>
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
      
    </ThemeProvider>
    </div>
    
  );
}

export default App;
