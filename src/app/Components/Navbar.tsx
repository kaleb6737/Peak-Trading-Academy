// src/app/Components/Navbar/Navbar.tsx

"use client";

import Link from "next/link";
import { useState } from "react";
import { FaUserCircle, FaBars } from "react-icons/fa";
import { useUser } from "@/context/UserContext";

import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Box,
  Typography,
  Menu,
  MenuItem,
  Divider,
  Tooltip,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { styled } from "@mui/material/styles";

// Custom colors
const accentWarmYellow = "#D1C382";
const hoverGold = "#DAA520";
const menuBgColor = "#1a1a1a";

// Styled Typography for title and menu links
const AccentText = styled(Typography)({
  color: accentWarmYellow,
  "&:hover": {
    color: hoverGold,
    transition: "color 0.3s ease",
  },
});

// Navbar component
const Navbar = () => {
  const { user, signOut } = useUser();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showSignOutConfirm, setShowSignOutConfirm] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Open/close profile menu
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setIsDropdownOpen(true);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    setIsDropdownOpen(false);
  };

  return (
    <AppBar position="fixed" sx={{ bgcolor: "black" }} elevation={4}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Logo */}
        <Link href="/" passHref>
          <AccentText variant="h5" sx={{ fontWeight: "bold", cursor: "pointer", transition: "transform 0.3s", "&:hover": { transform: "scale(1.1)" } }}>
            Peak Trader Academy
          </AccentText>
        </Link>

        {/* Hamburger Menu Icon for Mobile */}
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <IconButton
            onClick={() => setDrawerOpen(true)}
            sx={{ color: accentWarmYellow }}
          >
            <FaBars />
          </IconButton>
        </Box>

        {/* Desktop Links */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 4 }}>
          <Link href="/#dashboard" passHref>
            <AccentText variant="h6" sx={{ fontWeight: "medium", cursor: "pointer" }}>Dashboard</AccentText>
          </Link>
          <Link href="/#lessons" passHref>
            <AccentText variant="h6" sx={{ fontWeight: "medium", cursor: "pointer" }}>Lessons</AccentText>
          </Link>
        </Box>

        {/* Profile Icon and Dropdown for Logged-in User */}
        {user ? (
          <Box>
            <Tooltip title="Profile">
              <IconButton onClick={handleMenuOpen} sx={{ color: accentWarmYellow, transition: "transform 0.2s", "&:hover": { color: hoverGold, transform: "scale(1.1)" } }}>
                <FaUserCircle className="text-4xl" />
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorEl}
              open={isDropdownOpen}
              onClose={handleMenuClose}
              PaperProps={{
                sx: {
                  bgcolor: menuBgColor,
                  color: accentWarmYellow,
                  boxShadow: "0px 6px 30px rgba(255, 215, 0, 0.25)",
                  mt: 1.5,
                  "& .MuiMenuItem-root:hover": {
                    bgcolor: "#333",
                  },
                },
              }}
            >
              <MenuItem disabled>
                <Typography variant="subtitle1">Hello, {user.name || "User"}</Typography>
              </MenuItem>
              <MenuItem disabled>
                <Typography variant="body2">{user.email}</Typography>
              </MenuItem>
              <Divider sx={{ bgcolor: accentWarmYellow, my: 1 }} />
              <MenuItem
                onClick={() => setShowSignOutConfirm(true)}
                sx={{ color: accentWarmYellow, "&:hover": { bgcolor: "#333" } }}
              >
                Sign Out
              </MenuItem>
              
              {/* Sign-Out Confirmation */}
              {showSignOutConfirm && (
                <Box sx={{ mt: 1, px: 2 }}>
                  <Typography variant="subtitle1" sx={{ color: accentWarmYellow }}>
                    Are you sure you want to sign out?
                  </Typography>
                  <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
                    <Button
                      onClick={() => setShowSignOutConfirm(false)}
                      sx={{
                        bgcolor: "#333",
                        color: accentWarmYellow,
                        fontWeight: "bold",
                        "&:hover": { bgcolor: "#555" },
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={() => {
                        setShowSignOutConfirm(false);
                        handleMenuClose();
                        signOut();
                      }}
                      sx={{
                        bgcolor: "#B22222",
                        color: "white",
                        fontWeight: "bold",
                        "&:hover": { bgcolor: "#FF6347" },
                      }}
                    >
                      Confirm
                    </Button>
                  </Box>
                </Box>
              )}
            </Menu>
          </Box>
        ) : (
          <Link href="/welcome" passHref>
            <Button sx={{ color: accentWarmYellow, fontWeight: "bold", "&:hover": { color: hoverGold, transition: "color 0.3s ease" } }}>
              Login
            </Button>
          </Link>
        )}
      </Toolbar>

      {/* Drawer for Mobile Links */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            bgcolor: "black",
            color: accentWarmYellow,
            width: 240,
          },
        }}
      >
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() => setDrawerOpen(false)} component={Link} href="/#dashboard">
              <ListItemText primary="Dashboard" sx={{ color: accentWarmYellow, "&:hover": { color: hoverGold } }} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => setDrawerOpen(false)} component={Link} href="/#lessons">
              <ListItemText primary="Lessons" sx={{ color: accentWarmYellow, "&:hover": { color: hoverGold } }} />
            </ListItemButton>
          </ListItem>
          {user ? (
            <ListItem disablePadding>
              <ListItemButton onClick={() => setShowSignOutConfirm(true)}>
                <ListItemText primary="Sign Out" sx={{ color: accentWarmYellow, "&:hover": { color: hoverGold } }} />
              </ListItemButton>
            </ListItem>
          ) : (
            <ListItem disablePadding>
              <ListItemButton onClick={() => setDrawerOpen(false)} component={Link} href="/welcome">
                <ListItemText primary="Login" sx={{ color: accentWarmYellow, "&:hover": { color: hoverGold } }} />
              </ListItemButton>
            </ListItem>
          )}
        </List>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
