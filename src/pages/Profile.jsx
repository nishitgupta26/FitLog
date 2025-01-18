import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { Paper } from "@mui/material";

export default function Profile() {
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    aboutMe: "",
  });

  // Load data from local storage on component mount
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("profileData"));
    if (storedData) {
      setProfileData(storedData);
    }
  }, []);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Save data to local storage and reset fields
  const handleSave = () => {
    localStorage.setItem("profileData", JSON.stringify(profileData));
    alert("Profile saved successfully!");
    setProfileData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      aboutMe: "",
    });
  };

  // Reset fields without saving
  const handleCancel = () => {
    setProfileData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      aboutMe: "",
    });
  };

  // Get profile name from state or local storage
  const storedData = JSON.parse(localStorage.getItem("profileData"));
  const firstName = storedData?.firstName || "John";
  const lastName = storedData?.lastName || "Doe";
  const aboutMe =
    storedData?.aboutMe || "Fitness Enthusiast | Goal Setter | Achiever";

  return (
    <div className="tw-flex tw-justify-center tw-items-center tw-w-full tw-h-full">
      <Paper
        elevation={3}
        className="tw-bg-white tw-rounded-lg tw-px-8 tw-py-6 tw-w-full md:tw-w-2/3 lg:tw-w-1/2 tw-shadow-lg tw-space-y-6"
      >
        <div className="tw-flex tw-flex-col tw-items-center tw-space-y-4">
          <Avatar
            src="/profile-placeholder.png"
            alt={firstName}
            className="tw-h-24 tw-w-24 tw-bg-blue-500"
          />
          <h1 className="tw-text-xl tw-font-bold tw-text-gray-700">
            {firstName} {lastName}
          </h1>
          <p className="tw-text-gray-500 tw-text-sm">{aboutMe}</p>
        </div>

        <form className="tw-space-y-4">
          <Box className="tw-flex tw-flex-col md:tw-flex-row tw-gap-4">
            <TextField
              label="First Name"
              name="firstName"
              value={profileData.firstName}
              onChange={handleInputChange}
              variant="outlined"
              fullWidth
              className="tw-bg-white"
            />
            <TextField
              label="Last Name"
              name="lastName"
              value={profileData.lastName}
              onChange={handleInputChange}
              variant="outlined"
              fullWidth
              className="tw-bg-white"
            />
          </Box>
          <TextField
            label="Email"
            name="email"
            value={profileData.email}
            onChange={handleInputChange}
            variant="outlined"
            fullWidth
            className="tw-bg-white"
          />
          <TextField
            label="Phone Number"
            name="phone"
            value={profileData.phone}
            onChange={handleInputChange}
            variant="outlined"
            fullWidth
            className="tw-bg-white"
          />
          <TextField
            label="About Me"
            name="aboutMe"
            value={profileData.aboutMe}
            onChange={handleInputChange}
            variant="outlined"
            multiline
            rows={4}
            fullWidth
            className="tw-bg-white"
          />
        </form>

        <div className="tw-flex tw-justify-between tw-items-center tw-space-y-2">
          <Button
            variant="contained"
            color="primary"
            className="tw-bg-blue-500 hover:tw-bg-blue-600 tw-w-1/3 tw-py-2 tw-font-medium tw-text-white"
            onClick={handleSave}
          >
            Save
          </Button>
          <Button
            variant="outlined"
            color="error"
            className="tw-border-red-500 hover:tw-bg-red-100 tw-w-1/3 tw-py-2 tw-font-medium tw-text-red-500"
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </div>
      </Paper>
    </div>
  );
}
