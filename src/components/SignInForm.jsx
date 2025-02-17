import React, { useState } from "react";
import { TextField, Button, Paper, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import Cookies from "js-cookie";

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/login`,
        {
          email,
          password,
        }
      );
      login(response.data.token); // Store token in context
      navigate("/"); // Redirect to home page
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || "Invalid email or password");
    }
  };

  const handleSignUpRedirect = () => {
    navigate("/sign-up");
  };

  return (
    <Paper className="tw-p-6 tw-bg-white tw-rounded-xl tw-border tw-border-gray-100">
      {error && (
        <Typography variant="body2" color="error" className="tw-mb-4">
          {error}
        </Typography>
      )}
      <form onSubmit={handleSubmit} className="tw-space-y-4">
        <TextField
          label="Email"
          type="email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Sign In
        </Button>
        <Box className="tw-mt-4">
          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            onClick={handleSignUpRedirect}
          >
            Create New Account
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default SignInForm;
