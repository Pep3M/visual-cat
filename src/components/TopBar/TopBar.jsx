import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  AppBar,
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
  Button,
  Drawer,
} from "@material-ui/core";
import MenuIcon from "@mui/icons-material/Menu";
import ListItemButton from "@mui/material/ListItemButton";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { globalsColors } from "../../styles/GlobalStyles";
import { Settings } from "@mui/icons-material";
import { Link } from "react-router-dom";

const drawerWidth = 240;
const navItems = ["Filmes", "Series", "Novelas", "Anime"];

const TopBar = (props) => {
  const theme = useTheme();
  const bp600up = useMediaQuery(theme.breakpoints.up(600));

  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{
        height: "100%",
        textAlign: "center",
        bgcolor: globalsColors.lightBaseThin,
      }}
    >
      <Link
        to={"/"}
        style={{
          textDecoration: "none",
        }}
      >
        <Typography
          variant="h6"
          style={{
            color: globalsColors.primary,
            backgroundColor: globalsColors.lightBaseSecondary,
            padding: 20,
          }}
        >
          Visual<strong>Cat</strong>
        </Typography>
      </Link>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item}>
            <Link
              to={`/${item.toLowerCase()}`}
              style={{ textDecoration: "none" }}
            >
              <ListItemButton
                sx={{ textAlign: "center", color: globalsColors.primary }}
              >
                <ListItemText primary={item} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <AppBar
        component="nav"
        style={{
          backgroundColor: globalsColors.lightBaseThin,
          color: globalsColors.primary,
          borderBottom: `${globalsColors.primaryThin} 1px solid`,
          backdropFilter: "blur(20px)",
          boxShadow:
            "0px 2px 4px -1px RGB(255,255,255,0.3), 0px 4px 5px 0px RGB(255,255,255,0.2)",
        }}
      >
        <Toolbar
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              style={{ mr: 2, display: bp600up ? "none" : "block" }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              style={{ flexGrow: 1, display: !bp600up ? "none" : "block" }}
            >
              VisualCat
            </Typography>
          </Box>
          <Box sx={{ display: !bp600up ? "none" : "block" }}>
            {navItems.map((item) => (
              <Link
                to={`/${item.toLowerCase()}`}
                style={{ textDecoration: "none" }}
              >
                <Button
                  key={item}
                  variant="text"
                  style={{ color: globalsColors.primary }}
                >
                  {item}
                </Button>
              </Link>
            ))}
          </Box>
          <Link to={"/manager"}>
            <IconButton color="primary">
              <Settings />
            </IconButton>
          </Link>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          style={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawerPaper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Toolbar />
    </Box>
  );
};

TopBar.propTypes = {
  window: PropTypes.func,
};

export default TopBar;
