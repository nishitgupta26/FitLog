import React from "react";
import { Navigate } from "react-router-dom";
import SignUpForm from "../components/SignUpForm";
import { Box, Typography } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import backgroundImage from "../assets/background.png"; // Adjust the path as necessary

const SignUp = () => {
  const { isAuthenticated } = useAuth();

  // Add redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <Box
      className="tw-flex tw-justify-center tw-items-center tw-min-h-screen"
      sx={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        width: "100vw",
        position: "fixed",
        top: 0,
        left: 0,
      }}
    >
      <Box
        className="tw-p-6 tw-bg-white tw-rounded-xl tw-shadow-lg tw-border tw-border-gray-100"
        sx={{
          maxWidth: 400, // Increase the maxWidth to make the form wider
          width: "100%",
          backdropFilter: "blur(10px)",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
        }}
      >
        <Typography variant="h4" className="tw-mb-4" align="center">
          Create Your Account
        </Typography>
        <SignUpForm />
      </Box>
    </Box>
  );
};

export default SignUp;
