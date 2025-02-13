import React, { useState } from "react";
import { TextField, Button, Paper, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const SignUpForm = ({ onSignUp }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/auth/signup", {
        email,
        password,
      });
      console.log("Sign-up response:", response.data);
      // Handle successful sign-up
      onSignUp(response.data);
      Cookies.set("token", response.data.token, { expires: 7 }); // Store token in cookie for 7 days
      navigate("/"); // Redirect to home page
    } catch (err) {
      setError("Failed to create account. Please try again.", err);
    }
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
          Sign Up
        </Button>
      </form>
    </Paper>
  );
};

export default SignUpForm;
