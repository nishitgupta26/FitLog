import React from "react";
import SignInForm from "../components/SignInForm";
import { Box, Typography } from "@mui/material";
import backgroundImage from "../assets/background.png"; // Adjust the path as necessary

const SignIn = ({ onSignIn }) => {
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
          maxWidth: 400,
          width: "100%",
          backdropFilter: "blur(10px)",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
        }}
      >
        <Typography variant="h4" className="tw-mb-4" align="center">
          Welcome to FitLog
        </Typography>
        <Typography variant="h6" className="tw-mb-4" align="center">
          Sign In to Continue
        </Typography>
        <SignInForm onSignIn={onSignIn} />
      </Box>
    </Box>
  );
};

export default SignIn;