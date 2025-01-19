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
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
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
      // Enhanced logout feedback
      const feedback = document.createElement("div");
      feedback.className =
        "tw-fixed tw-bottom-4 tw-right-4 tw-bg-blue-500 tw-text-white tw-px-6 tw-py-3 tw-rounded-lg tw-shadow-lg";
      feedback.textContent = "Successfully logged out";
      document.body.appendChild(feedback);
      setTimeout(() => feedback.remove(), 3000);
    } else {
      navigate(path);
    }
    handleClose();
    handleMobileMenuClose();
  };

  const navItems = [
    { label: "Guide", icon: <MenuBookIcon />, path: "/guide" },
    { label: "Set New Goal", icon: <FlagIcon />, path: "/set-goal" },
    { label: "Update Goal", icon: <EditIcon />, path: "/update-goal" },
  ];

  return (
    <nav className="tw-bg-white tw-shadow-lg">
      <div className="tw-container tw-mx-auto tw-flex tw-items-center tw-justify-between tw-py-3 tw-px-4 sm:tw-px-6 lg:tw-px-8">
        {/* Logo Section */}
        <div className="tw-flex tw-items-center tw-space-x-2">
          <IconButton
            onClick={() => navigate("/")}
            className="tw-p-2 hover:tw-bg-blue-50 tw-transition-colors"
          >
            <FitbitOutlinedIcon className="tw-text-blue-500 tw-h-7 tw-w-7" />
          </IconButton>
          <Typography
            variant="h6"
            className="tw-text-gray-800 tw-font-bold tw-tracking-tight hover:tw-text-blue-500 tw-cursor-pointer tw-transition-colors"
            onClick={() => navigate("/")}
          >
            FitLog
          </Typography>
        </div>

        {/* Desktop Navigation */}
        <div className="tw-hidden md:tw-flex tw-items-center tw-space-x-6">
          {navItems.map((item, index) => (
            <Button
              key={item.path}
              variant={
                index === 2 ? "contained" : index === 1 ? "outlined" : "text"
              }
              className={`tw-normal-case tw-font-medium tw-px-4 tw-py-2 tw-rounded-lg tw-transition-all duration-200 ${
                index === 2
                  ? "tw-bg-blue-500 hover:tw-bg-blue-600 tw-text-white tw-shadow-md hover:tw-shadow-lg"
                  : index === 1
                  ? "tw-text-blue-500 tw-border-blue-500 hover:tw-bg-blue-50"
                  : "tw-text-gray-700 hover:tw-bg-gray-50"
              }`}
              startIcon={React.cloneElement(item.icon, {
                className: index === 0 ? "tw-text-blue-500" : "",
              })}
              onClick={() => handleNavigate(item.path)}
            >
              {item.label}
            </Button>
          ))}

          {/* Profile Menu */}
          <IconButton
            onClick={handleMenu}
            className="tw-ml-2 hover:tw-bg-blue-50 tw-transition-colors"
          >
            <AccountCircle className="tw-text-blue-500 tw-h-7 tw-w-7" />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            PaperProps={{
              className: "tw-mt-2 tw-rounded-lg tw-shadow-lg",
              elevation: 3,
            }}
          >
            <MenuItem
              onClick={() => handleNavigate("/profile")}
              className="tw-px-4 tw-py-2 tw-space-x-2 hover:tw-bg-gray-50"
            >
              <PersonIcon className="tw-text-gray-500" />
              <span>Profile</span>
            </MenuItem>
            <MenuItem
              onClick={() => handleNavigate("logout")}
              className="tw-px-4 tw-py-2 tw-space-x-2 hover:tw-bg-gray-50 tw-text-red-500"
            >
              <LogoutIcon className="tw-text-red-500" />
              <span>Logout</span>
            </MenuItem>
          </Menu>
        </div>

        {/* Mobile Menu */}
        <div className="md:tw-hidden">
          <IconButton
            onClick={handleMobileMenu}
            className="hover:tw-bg-blue-50 tw-transition-colors"
          >
            <MenuIcon className="tw-text-blue-500 tw-h-6 tw-w-6" />
          </IconButton>
          <Menu
            anchorEl={mobileMenuAnchor}
            open={Boolean(mobileMenuAnchor)}
            onClose={handleMobileMenuClose}
            PaperProps={{
              className: "tw-mt-2 tw-rounded-lg tw-shadow-lg",
              elevation: 3,
            }}
          >
            {navItems.map((item) => (
              <MenuItem
                key={item.path}
                onClick={() => handleNavigate(item.path)}
                className="tw-px-4 tw-py-3 tw-space-x-3 hover:tw-bg-gray-50"
              >
                {React.cloneElement(item.icon, {
                  className: "tw-text-blue-500",
                })}
                <span>{item.label}</span>
              </MenuItem>
            ))}
            <div className="tw-h-px tw-bg-gray-200 tw-mx-3" />
            <MenuItem
              onClick={() => handleNavigate("/profile")}
              className="tw-px-4 tw-py-3 tw-space-x-3 hover:tw-bg-gray-50"
            >
              <PersonIcon className="tw-text-gray-500" />
              <span>Profile</span>
            </MenuItem>
            <MenuItem
              onClick={() => handleNavigate("logout")}
              className="tw-px-4 tw-py-3 tw-space-x-3 hover:tw-bg-gray-50 tw-text-red-500"
            >
              <LogoutIcon className="tw-text-red-500" />
              <span>Logout</span>
            </MenuItem>
          </Menu>
        </div>
      </div>
    </nav>
  );
}
