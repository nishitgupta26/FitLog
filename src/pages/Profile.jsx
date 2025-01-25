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
  LinearProgress,
  Typography,
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

  const achievements = [
    { title: "Workouts", value: 85, total: 100 },
    { title: "Goals Met", value: 12, total: 15 },
    { title: "Active Days", value: 28, total: 30 },
  ];

  // Check if email is already set
  const isEmailSet = Boolean(storedData?.email);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f3f4f6",
        py: 4,
      }}
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
                {/* Progress Section */}
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  Progress
                </Typography>
                <Card sx={{ mb: 4, p: 2, backgroundColor: "#f8fafc" }}>
                  {achievements.map((achievement, index) => (
                    <Box key={index} sx={{ mb: 2 }}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          mb: 1,
                        }}
                      >
                        <Typography variant="body2" color="text.secondary">
                          {achievement.title}
                        </Typography>
                        <Typography variant="body2" fontWeight="medium">
                          {achievement.value}/{achievement.total}
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={(achievement.value / achievement.total) * 100}
                        sx={{
                          height: 6,
                          borderRadius: 3,
                          bgcolor: "rgba(0,0,0,0.1)",
                          ".MuiLinearProgress-bar": {
                            bgcolor: "#4caf50",
                          },
                        }}
                      />
                    </Box>
                  ))}
                </Card>

                {/* Skills Section */}
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  Skills
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 4 }}>
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
    </Box>
  );
};

export default Profile;
