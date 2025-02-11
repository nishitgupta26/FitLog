import React, { useState } from "react";
import { TextField, Button, Paper, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const SignInForm = ({ onSignIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle sign-in logic here
    onSignIn(email, password);
  };

  const handleSignUpRedirect = () => {
    navigate("/sign-up");
  };

  return (
    <Paper className="tw-p-6 tw-bg-white tw-rounded-xl tw-border tw-border-gray-100">
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