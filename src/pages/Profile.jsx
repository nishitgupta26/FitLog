import React, { useState, useEffect } from "react";
import {
  PhotoCamera,
  Email,
  Phone,
  Person,
  Save,
  Refresh,
  Edit,
  LinkedIn,
  Instagram,
  GitHub,
  LocationOn,
  FitnessCenter,
  Height,
  MonitorWeight,
} from "@mui/icons-material";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Avatar,
  Chip,
  IconButton,
  Snackbar,
  Alert,
  Container,
  Box,
  Typography,
  Paper,
} from "@mui/material";

const Profile = () => {
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    aboutMe: "",
    location: "",
    fitnessGoal: "",
    height: "",
    weight: "",
  });

  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("profileData"));
    if (storedData) {
      setProfileData(storedData);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    localStorage.setItem("profileData", JSON.stringify(profileData));
    setShowAlert(true);
  };

  const handleReset = () => {
    const updatedData = {
      email: profileData.email, // Retain only the email
      firstName: "",
      lastName: "",
      phone: "",
      location: "",
      aboutMe: "",
      height: "",
      weight: "",
    };

    setProfileData(updatedData); // Update state
    localStorage.setItem("profileData", JSON.stringify(updatedData));
    setShowAlert(true); // Optional: Show alert if needed
  };

  const handleCloseAlert = () => setShowAlert(false);

  const storedData = JSON.parse(localStorage.getItem("profileData"));
  const firstName = storedData?.firstName || "John";
  const lastName = storedData?.lastName || "Doe";
  const aboutMe =
    storedData?.aboutMe || "Fitness Enthusiast | Goal Setter | Achiever";

  const skills = [
    "Weight Training",
    "Cardio",
    "Nutrition",
    "Yoga",
    "HIIT",
    "Marathon Runner",
  ];

  const quotes = [
    "The only way to do great work is to love what you do. - Steve Jobs",
    "The journey of a thousand miles begins with one step. - Lao Tzu",
    "Believe you can and you're halfway there. - Theodore Roosevelt",
    "Don't watch the clock; do what it does. Keep going. - Sam Levenson",
    "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
    "You are never too old to set another goal or to dream a new dream. - C.S. Lewis",
    "Act as if what you do makes a difference. It does. - William James",
    "Success is not the key to happiness. Happiness is the key to success. - Albert Schweitzer",
    "Your time is limited, don't waste it living someone else's life. - Steve Jobs",
    "The best way to predict the future is to create it. - Peter Drucker",
  ];

  const getQuoteOfTheDay = () => {
    const date = new Date();
    const dayOfYear = Math.floor(
      (date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24
    );
    return quotes[dayOfYear % quotes.length];
  };

  const quoteOfTheDay = getQuoteOfTheDay();

  // Check if email is already set
  const isEmailSet = Boolean(storedData?.email);

  return (
    <div className="tw-min-h-screen">
      <Paper
        elevation={0}
        className=" tw-bg-white tw-max-w-full tw-mx-auto tw-px-4 sm:tw-px-6 lg:tw-px-8 tw-py-4 sm:tw-py-6 lg:tw-py-8"
      >
        <Container maxWidth="lg">
          <Card
            sx={{
              borderRadius: 2,
              boxShadow:
                "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)",
            }}
          >
            {/* Profile Header */}
            <Box
              className="tw-bg-blue-500"
              sx={{
                height: 200,
                position: "relative",
                mb: 8,
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  bottom: -32,
                  left: { xs: "50%", md: 40 },
                  transform: { xs: "translateX(-50%)", md: "translateX(0)" },
                }}
              >
                <Avatar
                  sx={{
                    width: 120,
                    height: 120,
                    border: "4px solid white",
                    boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
                  }}
                >
                  {firstName[0]}
                  {lastName[0]}
                </Avatar>
              </Box>
            </Box>

            <CardContent sx={{ px: { xs: 2, md: 4 }, pb: 4 }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  gap: 4,
                }}
              >
                {/* Main Content */}
                <Box sx={{ flex: 2 }}>
                  <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                    Personal Information
                  </Typography>

                  <Box sx={{ display: "grid", gap: 3 }}>
                    {/* Name and Measurement Fields */}
                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                        gap: 2,
                      }}
                    >
                      <TextField
                        fullWidth
                        label="First Name"
                        name="firstName"
                        value={profileData.firstName}
                        onChange={handleInputChange}
                        InputProps={{
                          startAdornment: (
                            <Person sx={{ color: "text.secondary", mr: 1 }} />
                          ),
                        }}
                      />
                      <TextField
                        fullWidth
                        label="Last Name"
                        name="lastName"
                        value={profileData.lastName}
                        onChange={handleInputChange}
                        InputProps={{
                          startAdornment: (
                            <Person sx={{ color: "text.secondary", mr: 1 }} />
                          ),
                        }}
                      />
                      <TextField
                        fullWidth
                        label="Height (cm)"
                        name="height"
                        type="number"
                        value={profileData.height}
                        onChange={handleInputChange}
                        InputProps={{
                          startAdornment: (
                            <Height sx={{ color: "text.secondary", mr: 1 }} />
                          ),
                        }}
                      />
                      <TextField
                        fullWidth
                        label="Weight (kg)"
                        name="weight"
                        type="number"
                        value={profileData.weight}
                        onChange={handleInputChange}
                        InputProps={{
                          startAdornment: (
                            <MonitorWeight
                              sx={{ color: "text.secondary", mr: 1 }}
                            />
                          ),
                        }}
                      />
                    </Box>

                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      value={profileData.email}
                      onChange={handleInputChange}
                      disabled={isEmailSet}
                      InputProps={{
                        startAdornment: (
                          <Email sx={{ color: "text.secondary", mr: 1 }} />
                        ),
                      }}
                    />

                    <TextField
                      fullWidth
                      label="Phone"
                      name="phone"
                      value={profileData.phone}
                      onChange={handleInputChange}
                      InputProps={{
                        startAdornment: (
                          <Phone sx={{ color: "text.secondary", mr: 1 }} />
                        ),
                      }}
                    />

                    <TextField
                      fullWidth
                      label="Location"
                      name="location"
                      value={profileData.location}
                      onChange={handleInputChange}
                      InputProps={{
                        startAdornment: (
                          <LocationOn sx={{ color: "text.secondary", mr: 1 }} />
                        ),
                      }}
                    />

                    <TextField
                      fullWidth
                      label="About Me"
                      name="aboutMe"
                      value={profileData.aboutMe}
                      onChange={handleInputChange}
                      multiline
                      rows={4}
                      InputProps={{
                        startAdornment: (
                          <Edit
                            sx={{ color: "text.secondary", mr: 1, mt: 1.5 }}
                          />
                        ),
                      }}
                    />
                  </Box>
                </Box>

                {/* Side Content */}
                <Box sx={{ flex: 1 }}>
                  {/* Quote of the Day Section */}
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                    Quote of the Day
                  </Typography>
                  <Card sx={{ mb: 4, p: 2, backgroundColor: "#f8fafc" }}>
                    <Typography variant="body1" color="text.secondary">
                      {quoteOfTheDay}
                    </Typography>
                  </Card>

                  {/* Skills Section */}
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                    Skills
                  </Typography>
                  <Box
                    sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 4 }}
                  >
                    {skills.map((skill, index) => (
                      <Chip
                        key={index}
                        label={skill}
                        sx={{
                          backgroundColor: "#1e88e5",
                          color: "white",
                          "&:hover": {
                            backgroundColor: "#1976d2",
                          },
                        }}
                      />
                    ))}
                  </Box>

                  {/* Social Links */}
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                    Connect
                  </Typography>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <IconButton
                      sx={{
                        bgcolor: "#f3f4f6",
                        "&:hover": { bgcolor: "#e5e7eb" },
                      }}
                    >
                      <LinkedIn sx={{ color: "#1e88e5" }} />
                    </IconButton>
                    <IconButton
                      sx={{
                        bgcolor: "#f3f4f6",
                        "&:hover": { bgcolor: "#e5e7eb" },
                      }}
                    >
                      <Instagram sx={{ color: "#1e88e5" }} />
                    </IconButton>
                    <IconButton
                      sx={{
                        bgcolor: "#f3f4f6",
                        "&:hover": { bgcolor: "#e5e7eb" },
                      }}
                    >
                      <GitHub sx={{ color: "#1e88e5" }} />
                    </IconButton>
                  </Box>
                </Box>
              </Box>

              {/* Action Buttons */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: 2,
                  mt: 4,
                }}
              >
                <Button
                  variant="outlined"
                  startIcon={<Refresh />}
                  onClick={handleReset}
                  sx={{
                    borderColor: "#d1d5db",
                    color: "#4b5563",
                    "&:hover": {
                      borderColor: "#9ca3af",
                      backgroundColor: "#f9fafb",
                    },
                  }}
                >
                  Reset
                </Button>
                <Button
                  variant="contained"
                  startIcon={<Save />}
                  onClick={handleSave}
                  sx={{
                    bgcolor: "#1e88e5",
                    "&:hover": {
                      bgcolor: "#1976d2",
                    },
                  }}
                >
                  Save Changes
                </Button>
              </Box>
            </CardContent>
          </Card>

          <Snackbar
            open={showAlert}
            autoHideDuration={3000}
            onClose={handleCloseAlert}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert
              onClose={handleCloseAlert}
              severity="success"
              sx={{ width: "100%" }}
              elevation={6}
            >
              Profile updated successfully!
            </Alert>
          </Snackbar>
        </Container>
      </Paper>
    </div>
  );
};

export default Profile;
