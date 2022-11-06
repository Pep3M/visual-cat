import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  AppBar,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
} from "@material-ui/core";
import ListItemButton from "@mui/material/ListItemButton";
import { useMediaQuery, Tooltip } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  globalsColors,
} from "../../styles/GlobalStyles";
import { Settings } from "@mui/icons-material";
import { Link } from "react-router-dom";
import NotificationOrder from "./container/NotificationOrder";
import FlashingContainer from "./container/FlashingContainer";

const TopBar = (props) => {
  const { showNotifications, showManager } = props;

  const theme = useTheme();
  const bp600up = useMediaQuery(theme.breakpoints.up(600));

  return (
    <div
      style={{
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
          /* backdropFilter: "blur(20px)", */
          boxShadow:
            "0px 2px 4px -1px RGB(255,255,255,0.3), 0px 4px 5px 0px RGB(255,255,255,0.2)",
        }}
      >
        <Toolbar
          style={{
            display: "flex",
            position: "relative",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <Link
              to={"/"}
              style={{
                textDecoration: "none",
              }}
            >
              <img
                src={process.env.PUBLIC_URL + "/logo_to2digital.png"}
                alt=""
                style={{
                  marginTop: 5,
                  height: 20,
                }}
              />
            </Link>
          </div>
          {showNotifications ? (
            <>
              <div
                style={{
                  position: "absolute",
                  top: bp600up ? 9 : 4,
                  right: showManager ? 50 : 10,
                }}
              >
                <NotificationOrder />
              </div>
            </>
          ) : (
            <></>
          )}
          {showManager ? (
            <>
              <Link to={"/manager"}>
                <Tooltip title="Manager">
                  <IconButton
                    color="primary"
                    style={{
                      position: "absolute",
                      top: bp600up ? 9 : 4,
                      right: 4,
                    }}
                  >
                    <Settings />
                    <FlashingContainer />
                  </IconButton>
                  
                </Tooltip>
              </Link>
            </>
          ) : (
            <></>
          )}
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
};

TopBar.propTypes = {
  window: PropTypes.func,
};

export default TopBar;
