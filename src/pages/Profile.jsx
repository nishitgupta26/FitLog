import React, { useState, useEffect } from "react";
import {
  PhotoCamera,
  Email,
  Person,
  Save,
  Refresh,
  LinkedIn,
  Instagram,
  GitHub,
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
  Grid,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";

const Profile = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    height: "",
    weight: "",
  });

  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = Cookies.get("token");
        const response = await axios.get("http://localhost:8080/api/getuser", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Profile data response:", response.data);
        const profileData = {
          name: response.data.name,
          email: response.data.email,
          height: response.data.height,
          weight: response.data.weight,
        };

        localStorage.setItem("profileData", JSON.stringify(profileData));
        setProfileData(profileData);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    const storedData = JSON.parse(localStorage.getItem("profileData"));
    if (storedData) {
      setProfileData(storedData);
    } else {
      fetchProfileData();
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const token = Cookies.get("token");
      await axios.patch(
        "http://localhost:8080/api/setuser",
        {
          name: profileData.name,
          weight: parseFloat(profileData.weight),
          height: parseFloat(profileData.height),
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      localStorage.setItem("profileData", JSON.stringify(profileData));
      setShowAlert(true);
    } catch (error) {
      console.error("Error updating profile:", error);
      setShowAlert(false);
      // Add error alert handling if needed
    }
  };

  const handleReset = async () => {
    try {
      const token = Cookies.get("token");
      const updatedData = {
        email: profileData.email,
        name: "",
        height: "0",
        weight: "0",
      };

      await axios.patch(
        "http://localhost:8080/api/setuser",
        {
          name: "",
          weight: 0.0,
          height: 0.0,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProfileData(updatedData);
      localStorage.setItem("profileData", JSON.stringify(updatedData));
      setShowAlert(true);
    } catch (error) {
      console.error("Error resetting profile:", error);
      setShowAlert(false);
    }
  };

  const handleCloseAlert = () => setShowAlert(false);

  const storedData = JSON.parse(localStorage.getItem("profileData"));
  const name = storedData?.name || "John Doe";

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
  const isEmailSet = Boolean(storedData?.email);

  return (
    <Box className="tw-min-h-screen tw-bg-gray-50">
      <Container maxWidth="lg" className="tw-py-8">
        <Card
          elevation={2}
          className="tw-overflow-hidden"
          sx={{
            borderRadius: 3,
            backgroundColor: "white",
          }}
        >
          {/* Profile Header/Banner */}
          <Box
            className="tw-bg-blue-500 tw-relative"
            sx={{
              height: isMobile ? 160 : 200,
              transition: "height 0.3s ease",
            }}
          >
            {/* Avatar */}
            <Box
              className="tw-absolute tw-left-1/2 tw-transform -tw-translate-x-1/2 md:tw-left-12 md:tw-transform-none"
              sx={{
                bottom: isMobile ? -40 : -60,
                transition: "all 0.3s ease",
              }}
            >
              <Avatar
                className="tw-border-4 tw-border-white tw-shadow-lg"
                sx={{
                  width: isMobile ? 80 : 120,
                  height: isMobile ? 80 : 120,
                  transition: "all 0.3s ease",
                  fontSize: isMobile ? "1.5rem" : "2rem",
                }}
              >
                {name[0]}
              </Avatar>
            </Box>
          </Box>

          {/* Main Content */}
          <CardContent
            sx={{
              pt: isMobile ? 6 : 8,
              px: { xs: 2, sm: 3, md: 4 },
              pb: 4,
            }}
          >
            <Grid container spacing={4}>
              {/* Left Column - Personal Info */}
              <Grid item xs={12} md={8}>
                <Typography variant="h5" className="tw-font-semibold tw-mb-6">
                  Personal Information
                </Typography>

                <Grid container spacing={3}>
                  {/* Name Fields */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Name"
                      name="name"
                      value={profileData.name}
                      onChange={handleInputChange}
                      InputProps={{
                        startAdornment: (
                          <Person className="tw-mr-2 tw-text-gray-500" />
                        ),
                      }}
                    />
                  </Grid>

                  {/* Measurements */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Height (cm)"
                      name="height"
                      type="number"
                      value={profileData.height}
                      onChange={handleInputChange}
                      InputProps={{
                        startAdornment: (
                          <Height className="tw-mr-2 tw-text-gray-500" />
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Weight (kg)"
                      name="weight"
                      type="number"
                      value={profileData.weight}
                      onChange={handleInputChange}
                      InputProps={{
                        startAdornment: (
                          <MonitorWeight className="tw-mr-2 tw-text-gray-500" />
                        ),
                      }}
                    />
                  </Grid>

                  {/* Email */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      value={profileData.email}
                      onChange={handleInputChange}
                      disabled={isEmailSet}
                      InputProps={{
                        startAdornment: (
                          <Email className="tw-mr-2 tw-text-gray-500" />
                        ),
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>

              {/* Right Column - Additional Info */}
              <Grid item xs={12} md={4}>
                {/* Quote of the Day */}
                <Box className="tw-mb-6">
                  <Typography variant="h6" className="tw-font-semibold tw-mb-3">
                    Quote of the Day
                  </Typography>
                  <Card className="tw-bg-gray-50" sx={{ p: 2 }}>
                    <Typography variant="body1" color="text.secondary">
                      {quoteOfTheDay}
                    </Typography>
                  </Card>
                </Box>

                {/* Skills */}
                <Box className="tw-mb-6">
                  <Typography variant="h6" className="tw-font-semibold tw-mb-3">
                    Skills
                  </Typography>
                  <Box className="tw-flex tw-flex-wrap tw-gap-2">
                    {skills.map((skill, index) => (
                      <Chip
                        key={index}
                        label={skill}
                        className="tw-text-white hover:tw-bg-blue-600"
                        sx={{
                          backgroundColor: "#1e88e5",
                          transition: "background-color 0.3s ease",
                        }}
                      />
                    ))}
                  </Box>
                </Box>

                {/* Social Links */}
                <Box>
                  <Typography variant="h6" className="tw-font-semibold tw-mb-3">
                    Connect
                  </Typography>
                  <Box className="tw-flex tw-gap-2">
                    {[LinkedIn, Instagram, GitHub].map((Icon, index) => (
                      <IconButton
                        key={index}
                        className="tw-bg-gray-100 hover:tw-bg-gray-200"
                        sx={{ transition: "all 0.3s ease" }}
                      >
                        <Icon className="tw-text-blue-500" />
                      </IconButton>
                    ))}
                  </Box>
                </Box>
              </Grid>
            </Grid>

            {/* Action Buttons */}
            <Box
              className="tw-flex tw-justify-end tw-gap-3 tw-mt-8"
              sx={{
                flexDirection: isMobile ? "column" : "row",
              }}
            >
              <Button
                variant="outlined"
                startIcon={<Refresh />}
                onClick={handleReset}
                fullWidth={isMobile}
                className="tw-border-gray-300 tw-text-gray-600 hover:tw-bg-gray-50"
              >
                Reset
              </Button>
              <Button
                variant="contained"
                startIcon={<Save />}
                onClick={handleSave}
                fullWidth={isMobile}
                className="tw-bg-blue-500 hover:tw-bg-blue-600"
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
            elevation={6}
            className="tw-w-full"
          >
            Profile updated successfully!
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default Profile;
