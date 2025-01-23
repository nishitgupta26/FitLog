import React from "react";
import { CircularProgress, Typography, Box, Container } from "@mui/material";
import { keyframes } from "@emotion/react";

const pulseAnimation = keyframes`
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.05); opacity: 0.7; }
  100% { transform: scale(1); opacity: 1; }
`;

const Loading = () => {
  return (
    <Container
      maxWidth="xl"
      className="tw-flex tw-items-center tw-justify-center tw-min-h-screen tw-bg-gradient-to-br tw-bg-white"
    >
      <Box
        className="tw-text-center tw-p-8 tw-rounded-2xl tw-shadow-2xl tw-bg-white tw-bg-opacity-80 tw-backdrop-blur-sm tw-border tw-border-gray-100"
        sx={{
          animation: `${pulseAnimation} 2s infinite ease-in-out`,
          maxWidth: { xs: "90%", sm: "500px", md: "600px" },
        }}
      >
        <CircularProgress
          size={80}
          thickness={4}
          className="tw-mb-6 tw-text-blue-600"
          color="primary"
        />
        <Typography
          variant="h4"
          className="tw-font-semibold tw-text-gray-800 tw-tracking-wide"
        >
          Loading Content
        </Typography>
        <Typography variant="subtitle1" className="tw-text-gray-600 tw-mt-2">
          Please wait while we prepare your experience
        </Typography>
      </Box>
    </Container>
  );
};

export default Loading;
