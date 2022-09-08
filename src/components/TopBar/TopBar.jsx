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

const drawerWidth = 240;
const navItems = ["Filmes", "Series", "Novelas", "Anime"];

const TopBar = (props) => {
  const theme = useTheme();
  const bp600up = useMediaQuery(theme.breakpoints.up(600))

  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{
        height: '100%',
        textAlign: "center",
        /* bgcolor: '#f0f0f0' */
      }}
    >
      <Typography
        variant="h6"
        color="initial"
        style={{
          margin: 20,
        }}
      >
        Visual<strong>Cat</strong>
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={item} />
            </ListItemButton>
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
        display: "flex", justifyContent: "space-between", 
      }}
    >
      <AppBar component="nav" style={{
        backgroundColor: 'RGB(255,255,255,0.7)',
        color: globalsColors.primary,
        borderBottom: 'RGB(25,118,210,0.2) 1px solid',
        backdropFilter: 'blur(20px)',
        boxShadow: '0px 2px 4px -1px RGB(255,255,255,0.3), 0px 4px 5px 0px RGB(255,255,255,0.2)',
      }}>
        <Toolbar
          style={{
            display: "flex",  justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: 'center' }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              style={{ mr: 2, display: bp600up ? 'none' : 'block' }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              style={{ flexGrow: 1, display: !bp600up ? 'none' : 'block'}}
            >
              VisualCat
            </Typography>
          </Box>
          <Box sx={{ display: !bp600up ? 'none' : 'block' }}>
            {navItems.map((item) => (
              <Button key={item} variant="text" style={{ color: "RGB(25,118,210)" }}>
               {item}
              </Button>
            ))}
          </Box>
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
            "& .MuiDrawer-paper": {
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
