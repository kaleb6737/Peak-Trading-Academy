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

// Custom Colors and Styling
const accentWarmYellow = "#D1C382";
const hoverGold = "#DAA520";
const menuBgColor = "#1a1a1a";

// Styled Typography
const AccentText = styled(Typography)({
  color: accentWarmYellow,
  fontWeight: "bold",
  "&:hover": {
    color: hoverGold,
    transition: "color 0.3s ease",
  },
});

// Navbar Component
const Navbar = () => {
  const { user, signOut } = useUser();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showSignOutConfirm, setShowSignOutConfirm] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Menu Handling
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setIsDropdownOpen(true);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    setIsDropdownOpen(false);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        bgcolor: "black",
        zIndex: 1300,
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", px: 4 }}>
        {/* Logo */}
        <Link href="/" passHref>
          <AccentText
            variant="h5"
            sx={{
              cursor: "pointer",
              transition: "transform 0.3s ease",
              "&:hover": { transform: "scale(1.1)" },
              textShadow: "2px 2px 10px rgba(255, 223, 0, 0.7)",
            }}
          >
            Peak Trader Academy
          </AccentText>
        </Link>

        {/* Hamburger Icon for Mobile */}
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <IconButton
            onClick={() => setDrawerOpen(true)}
            sx={{
              color: accentWarmYellow,
              transition: "transform 0.3s ease",
              "&:hover": { transform: "rotate(90deg)" },
            }}
          >
            <FaBars />
          </IconButton>
        </Box>

        {/* Desktop Links */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 4 }}>
          <Link href="/#dashboard" passHref>
            <AccentText
              variant="h6"
              sx={{
                cursor: "pointer",
                textShadow: "1px 1px 5px rgba(255, 215, 0, 0.3)",
                "&:hover": { textShadow: "2px 2px 10px rgba(255, 223, 0, 0.7)" },
              }}
            >
              Dashboard
            </AccentText>
          </Link>
          <Link href="/#lessons" passHref>
            <AccentText
              variant="h6"
              sx={{
                cursor: "pointer",
                textShadow: "1px 1px 5px rgba(255, 215, 0, 0.3)",
                "&:hover": { textShadow: "2px 2px 10px rgba(255, 223, 0, 0.7)" },
              }}
            >
              Lessons
            </AccentText>
          </Link>
          <Link href="/#resources" passHref>
            <AccentText
              variant="h6"
              sx={{
                cursor: "pointer",
                textShadow: "1px 1px 5px rgba(255, 215, 0, 0.3)",
                "&:hover": { textShadow: "2px 2px 10px rgba(255, 223, 0, 0.7)" },
              }}
            >
              Resources
            </AccentText>
          </Link>
        </Box>

        {/* Profile Icon and Dropdown */}
        {user ? (
          <Box>
            <Tooltip title="Profile">
              <IconButton
                onClick={handleMenuOpen}
                sx={{
                  color: accentWarmYellow,
                  transition: "transform 0.2s ease",
                  "&:hover": { transform: "scale(1.1)", color: hoverGold },
                  textShadow: "0px 4px 8px rgba(255, 215, 0, 0.5)",
                }}
              >
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
                  mt: 1.5,
                  borderRadius: "8px",
                  boxShadow: "0px 6px 20px rgba(255, 215, 0, 0.5)",
                },
              }}
            >
              <MenuItem disabled>
                <Typography variant="subtitle1">
                  Hello, {user.name || "User"}
                </Typography>
              </MenuItem>
              <MenuItem disabled>
                <Typography variant="body2">{user.email}</Typography>
              </MenuItem>
              <Divider sx={{ bgcolor: accentWarmYellow, my: 1 }} />
              <MenuItem onClick={() => signOut()} sx={{ "&:hover": { bgcolor: "#333" } }}>
                Sign Out
              </MenuItem>
            </Menu>
          </Box>
        ) : (
          <Link href="/welcome" passHref>
            <Button
              sx={{
                color: accentWarmYellow,
                fontWeight: "bold",
                "&:hover": { color: hoverGold },
              }}
            >
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
            bgcolor: "rgba(0, 0, 0, 0.9)",
            color: accentWarmYellow,
            width: 280,
            boxShadow: "0 4px 20px rgba(255, 215, 0, 0.5)",
          },
        }}
      >
        <List>
          {["Dashboard", "Lessons", "Resources"].map((text) => (
            <ListItem disablePadding key={text}>
              <ListItemButton
                onClick={() => setDrawerOpen(false)}
                component={Link}
                href={`/#${text.toLowerCase()}`}
              >
                <ListItemText
                  primary={text}
                  sx={{
                    textAlign: "center",
                    color: accentWarmYellow,
                    "&:hover": { color: hoverGold },
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
          {user ? (
            <ListItem disablePadding>
              <ListItemButton onClick={() => signOut()}>
                <ListItemText
                  primary="Sign Out"
                  sx={{
                    textAlign: "center",
                    color: accentWarmYellow,
                    "&:hover": { color: hoverGold },
                  }}
                />
              </ListItemButton>
            </ListItem>
          ) : (
            <ListItem disablePadding>
              <ListItemButton component={Link} href="/welcome">
                <ListItemText
                  primary="Login"
                  sx={{
                    textAlign: "center",
                    color: accentWarmYellow,
                    "&:hover": { color: hoverGold },
                  }}
                />
              </ListItemButton>
            </ListItem>
          )}
        </List>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
