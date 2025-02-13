import React, { useState } from "react";
import { TextField, Button, Paper, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { useAuth } from "../context/AuthContext";

const SignUpForm = ({ onSignUp }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    try {
      const response = await axios.post("http://localhost:8080/auth/signup", {
        email,
        password,
        name,
        height: parseFloat(height), // Convert height to number
        weight: parseFloat(weight), // Convert weight to number
      });
      console.log("Sign-up response:", response.data);
      login(response.data.token); // Use login from AuthContext
      navigate("/"); // Redirect to home page
    } catch (err) {
      console.error("Sign-up error:", err.response ? err.response.data : err.message);
      setError(err.response?.data?.message || "Failed to create account. Please try again.");
    }
  };

  const handleSignInRedirect = () => {
    navigate("/sign-in");
  };

  return (
    <Paper
      className="tw-p-6 tw-bg-white tw-rounded-xl tw-border tw-border-gray-100"
      sx={{
        padding: 4,
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        backdropFilter: "blur(10px)",
      }}
    >
      {error && (
        <Typography variant="body2" color="error" className="tw-mb-4">
          {error}
        </Typography>
      )}
      <form onSubmit={handleSubmit} className="tw-space-y-4">
        {error && (
          <Typography color="error" className="tw-text-center">
            {error}
          </Typography>
        )}

        <TextField
          label="Name"
          type="text"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="tw-bg-white/80"
        />

        <TextField
          label="Email"
          type="email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="tw-bg-white/80"
        />

        <TextField
          label="Password"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="tw-bg-white/80"
        />

        <TextField
          label="Height (cm)"
          type="number"
          fullWidth
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          required
          className="tw-bg-white/80"
        />

        <TextField
          label="Weight (kg)"
          type="number"
          fullWidth
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          required
          className="tw-bg-white/80"
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          className="tw-mt-4"
        >
          Sign Up
        </Button>

        <Box className="tw-text-center tw-mt-4">
          <Typography variant="body2" className="tw-text-gray-600">
            Already have an account?
          </Typography>
          <Button
            variant="text"
            color="primary"
            onClick={handleSignInRedirect}
            className="tw-mt-1"
          >
            Sign In
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default SignUpForm;
