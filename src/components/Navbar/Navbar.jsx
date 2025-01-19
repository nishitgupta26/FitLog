import React from "react";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import FitbitOutlinedIcon from "@mui/icons-material/FitbitOutlined";
import FlagIcon from "@mui/icons-material/Flag";
import EditIcon from "@mui/icons-material/Edit";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMenuAnchor, setMobileMenuAnchor] = React.useState(null);
  const navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenu = (event) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchor(null);
  };

  const handleNavigate = (path) => {
    if (path === "logout") {
      localStorage.removeItem("profileData");
      alert("You have been logged out.");
    } else {
      navigate(path);
    }
    handleClose();
    handleMobileMenuClose();
  };

  // Navigation items configuration
  const navItems = [
    { label: "Guide", icon: <MenuBookIcon />, path: "/guide" },
    { label: "Set New Goal", icon: <FlagIcon />, path: "/set-goal" },
    { label: "Update Goal", icon: <EditIcon />, path: "/update-goal" },
  ];

  return (
    <nav className="tw-bg-white tw-shadow-md">
      <div className="tw-container tw-mx-auto tw-flex tw-items-center tw-justify-between tw-py-4 tw-px-6">
        {/* Left Section: Home Icon and App Name */}
        <div className="tw-flex tw-items-center">
          <IconButton onClick={() => navigate("/")} className="tw-p-2">
            <FitbitOutlinedIcon className="tw-text-blue-500 tw-h-6 tw-w-6" />
          </IconButton>
          <Typography variant="h6" className="tw-text-black tw-font-semibold">
            FitLog
          </Typography>
        </div>

        {/* Desktop Navigation */}
        <div className="tw-hidden md:tw-flex tw-items-center tw-gap-4">
          {navItems.map((item, index) => (
            <Button
              key={item.path}
              variant={
                index === 2 ? "contained" : index === 1 ? "outlined" : "text"
              }
              className={`tw-normal-case tw-font-medium ${
                index === 2
                  ? "tw-bg-blue-500 hover:tw-bg-blue-600 tw-text-white"
                  : index === 1
                  ? "tw-text-blue-500 tw-border-blue-500 hover:tw-bg-blue-100"
                  : "tw-text-black"
              }`}
              startIcon={React.cloneElement(item.icon, {
                className: index === 0 ? "tw-text-blue-500" : "",
              })}
              onClick={() => handleNavigate(item.path)}
            >
              {item.label}
            </Button>
          ))}

          {/* Desktop Profile Menu */}
          <IconButton onClick={handleMenu}>
            <AccountCircle className="tw-text-blue-500 tw-h-6 tw-w-6" />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={() => handleNavigate("/profile")}>
              Profile
            </MenuItem>
            <MenuItem onClick={() => handleNavigate("logout")}>Logout</MenuItem>
          </Menu>
        </div>

        {/* Mobile Hamburger Menu */}
        <div className="md:tw-hidden">
          <IconButton onClick={handleMobileMenu}>
            <MenuIcon className="tw-text-blue-500 tw-h-6 tw-w-6" />
          </IconButton>
          <Menu
            anchorEl={mobileMenuAnchor}
            open={Boolean(mobileMenuAnchor)}
            onClose={handleMobileMenuClose}
            className="md:tw-hidden"
          >
            {navItems.map((item) => (
              <MenuItem
                key={item.path}
                onClick={() => handleNavigate(item.path)}
                className="tw-gap-2"
              >
                {React.cloneElement(item.icon, {
                  className: "tw-text-blue-500",
                })}
                {item.label}
              </MenuItem>
            ))}
            <MenuItem
              onClick={() => handleNavigate("/profile")}
              className="tw-gap-2"
            >
              <AccountCircle className="tw-text-blue-500" />
              Profile
            </MenuItem>
            <MenuItem
              onClick={() => handleNavigate("logout")}
              className="tw-gap-2"
            >
              <AccountCircle className="tw-text-blue-500" />
              Logout
            </MenuItem>
          </Menu>
        </div>
      </div>
    </nav>
  );
}
