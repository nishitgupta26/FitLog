import React from "react";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import FitbitOutlinedIcon from "@mui/icons-material/FitbitOutlined";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNavigate = (path) => {
    if (path === "logout") {
      localStorage.removeItem("profileData"); // Clear user info from local storage
      alert("You have been logged out."); // Optional alert for feedback
    } else {
      navigate(path);
    }
    handleClose();
  };

  return (
    <nav className="tw-bg-white tw-shadow-md">
      <div className="tw-container tw-mx-auto tw-flex tw-items-center tw-justify-between tw-py-4 tw-px-6">
        {/* Left Section: Home Icon and App Name */}
        <div className="tw-flex tw-items-center">
          <IconButton onClick={() => navigate("/")}>
            <FitbitOutlinedIcon className="tw-text-blue-500 tw-h-6 tw-w-6" />
          </IconButton>
          <Typography variant="h6" className="tw-text-black tw-font-semibold">
            FitLog
          </Typography>
        </div>

        {/* Right Section: Guide Button and Profile */}
        <div className="tw-flex tw-items-center tw-gap-4">
          {/* Guide Button */}
          <Button
            className="tw-text-black tw-font-medium tw-normal-case"
            startIcon={<MenuBookIcon className="tw-text-blue-500" />}
            onClick={() => navigate("/guide")}
          >
            Guide
          </Button>

          {/* Profile Menu */}
          <div className="tw-relative">
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
              <MenuItem onClick={() => handleNavigate("logout")}>
                Logout
              </MenuItem>
            </Menu>
          </div>
        </div>
      </div>
    </nav>
  );
}
