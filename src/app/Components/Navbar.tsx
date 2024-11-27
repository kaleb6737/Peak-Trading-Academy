"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
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
const AccentText = styled(Typography)(({ isActive }: { isActive: boolean }) => ({
  color: isActive ? hoverGold : accentWarmYellow,
  fontWeight: "bold",
  cursor: "pointer",
  transition: "color 0.3s ease",
  textShadow: isActive
    ? "2px 2px 10px rgba(255, 223, 0, 0.7)"
    : "1px 1px 5px rgba(255, 215, 0, 0.3)",
}));

const Navbar = () => {
  const { user, signOut } = useUser();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("dashboard");

  // Menu Handling
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setIsDropdownOpen(true);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const sections = ["dashboard", "lessons", "resources"];
    const sectionElements = sections.map((id) =>
      document.getElementById(id)
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { root: null, rootMargin: "0px", threshold: 0.6 }
    );

    sectionElements.forEach((el) => el && observer.observe(el));

    return () => {
      sectionElements.forEach((el) => el && observer.unobserve(el));
    };
  }, []);

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
            isActive={false}
            sx={{
              transition: "transform 0.3s ease",
              "&:hover": { transform: "scale(1.1)" },
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
              isActive={activeSection === "dashboard"}
            >
              Dashboard
            </AccentText>
          </Link>
          <Link href="/#lessons" passHref>
            <AccentText variant="h6" isActive={activeSection === "lessons"}>
              Lessons
            </AccentText>
          </Link>
          <Link href="/#resources" passHref>
            <AccentText variant="h6" isActive={activeSection === "resources"}>
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
              <MenuItem
                onClick={() => signOut()}
                sx={{ "&:hover": { bgcolor: "#333" } }}
              >
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
                    color: activeSection === text.toLowerCase() ? hoverGold : accentWarmYellow,
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
