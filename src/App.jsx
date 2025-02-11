import React, { useEffect, lazy, Suspense, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Loading from "./components/Loading/Loading";
import useExerciseGuideStore from "./stores/useExerciseGuideStore";
import { ThemeProvider, CssBaseline, Button } from "@mui/material";
import { lightTheme, darkTheme } from "./theme";
import { getInitialTheme, saveTheme } from "./utils/themeStorage";

const Home = lazy(() => import("./pages/Home"));
const Profile = lazy(() => import("./pages/Profile"));
const SetNewGoal = lazy(() => import("./pages/SetNewGoal"));
const ExerciseGuide = lazy(() => import("./pages/ExerciseGuide"));
const SignIn = lazy(() => import("./pages/SignIn"));
const SignUp = lazy(() => import("./pages/SignUp"));

function App() {
  const exerciseNames = useExerciseGuideStore((state) => state.exerciseNames);
  const [isDarkMode, setIsDarkMode] = useState(getInitialTheme);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Add authentication state
  const navigate = useNavigate(); // Add useNavigate hook

  useEffect(() => {
    if (!localStorage.getItem("exerciseNames")) {
      localStorage.setItem("exerciseNames", JSON.stringify(exerciseNames));
    }
  }, [exerciseNames]);

  useEffect(() => {
    saveTheme(isDarkMode);
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const handleSignIn = (email, password) => {
    // Handle sign-in logic here
    console.log("Sign In:", email, password);
    setIsAuthenticated(true); // Set authentication state to true on sign-in
    navigate("/"); // Redirect to home page
  };

  return (
    <div className="tw-min-h-screen tw-bg-gradient-to-br tw-from-blue-50 tw-to-indigo-50">
      {isAuthenticated && <Navbar />}
      <div className="tw-container tw-mx-auto tw-px-4 sm:tw-px-6 lg:tw-px-8 tw-py-6">
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  < Home/>
                ) : (
                  <Navigate to="/sign-in" />
                )
              }
            />
            <Route path="/profile" element={<Profile />} />
            <Route path="/set-goal" element={<SetNewGoal />} />
            <Route path="/guide" element={<ExerciseGuide />} />
            <Route path="/sign-in" element={<SignIn onSignIn={handleSignIn} />} />
            <Route path="/sign-up" element={<SignUp />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
}

export default App;
