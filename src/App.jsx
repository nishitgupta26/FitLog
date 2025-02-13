import React, { useEffect, lazy, Suspense, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Loading from "./components/Loading/Loading";
import { AuthProvider } from "./context/AuthContext";
import { getInitialTheme, saveTheme } from "./utils/themeStorage";
import Cookies from "js-cookie";
import { useAuth } from "./context/AuthContext";

const Home = lazy(() => import("./pages/Home"));
const Profile = lazy(() => import("./pages/Profile"));
const SetNewGoal = lazy(() => import("./pages/SetNewGoal"));
const ExerciseGuide = lazy(() => import("./pages/ExerciseGuide"));
const SignIn = lazy(() => import("./pages/SignIn"));
const SignUp = lazy(() => import("./pages/SignUp"));

// Protected Route Component
function ProtectedLayout({ children }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" replace />;
  }

  return children;
}

function App() {
  const [isDarkMode, setIsDarkMode] = useState(getInitialTheme);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // authentication state
  const navigate = useNavigate(); // useNavigate hook

  useEffect(() => {
    saveTheme(isDarkMode);
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const handleSignIn = (token) => {
    Cookies.set("token", token, { expires: 7 });
    setIsAuthenticated(true);
    navigate("/");
  };

  const handleSignOut = () => {
    Cookies.remove("token");
    setIsAuthenticated(false);
    navigate("/sign-in");
  };

  return (
    <AuthProvider>
      {" "}
      {/* Wrap entire app with AuthProvider */}
      <div className="tw-min-h-screen tw-bg-gradient-to-br tw-from-blue-50 tw-to-indigo-50">
        <Routes>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route
            path="/*"
            element={
              <ProtectedLayout>
                {" "}
                {/* New component to handle protected routes */}
                <Navbar />
                <div className="tw-container tw-mx-auto tw-px-4 sm:tw-px-6 lg:tw-px-8 tw-py-6">
                  <Suspense fallback={<Loading />}>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/set-goal" element={<SetNewGoal />} />
                      <Route path="/guide" element={<ExerciseGuide />} />
                    </Routes>
                  </Suspense>
                </div>
              </ProtectedLayout>
            }
          />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
