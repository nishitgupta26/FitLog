import React, { useState } from "react";
import { TextField, Button, Paper, Typography, Box } from "@mui/material";

const SignUpForm = ({ onSignUp }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [instagram, setInstagram] = useState("");
  const [skills, setSkills] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle sign-up logic here
    onSignUp({
      email,
      password,
      firstName,
      lastName,
      phone,
      location,
      aboutMe,
      height,
      weight,
      linkedin,
      instagram,
      skills,
    });
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
      <Typography variant="h5" className="tw-mb-4" align="center">
        Create Account
      </Typography>
      <form onSubmit={handleSubmit} className="tw-space-y-4">
        <TextField
          label="First Name"
          type="text"
          fullWidth
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <TextField
          label="Last Name"
          type="text"
          fullWidth
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <TextField
          label="Phone Number"
          type="tel"
          fullWidth
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <TextField
          label="Location"
          type="text"
          fullWidth
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
        <TextField
          label="About Me"
          type="text"
          fullWidth
          value={aboutMe}
          onChange={(e) => setAboutMe(e.target.value)}
          multiline
          rows={4}
          required
        />
        <TextField
          label="Height (cm)"
          type="number"
          fullWidth
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          required
        />
        <TextField
          label="Weight (kg)"
          type="number"
          fullWidth
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          required
        />
        <TextField
          label="LinkedIn Profile"
          type="url"
          fullWidth
          value={linkedin}
          onChange={(e) => setLinkedin(e.target.value)}
        />
        <TextField
          label="Instagram Profile"
          type="url"
          fullWidth
          value={instagram}
          onChange={(e) => setInstagram(e.target.value)}
        />
        <TextField
          label="Skills (comma separated)"
          type="text"
          fullWidth
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          required
        />
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