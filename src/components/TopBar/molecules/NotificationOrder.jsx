import { IconButton, Tooltip } from "@material-ui/core";
import { Notifications } from "@mui/icons-material";
import { Avatar, Badge, Box, ListItemAvatar, ListItemText, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import { globalsColors, neumorphismDivContainer } from "../../../styles/GlobalStyles";

const NotificationOrder = (props) => {

  const [notifState, setNotifState] = useState({
    anchorEl: null,
    info: [
      { from: "Prueba", message: "Esto es una prueba", cant: 2 },
      {
        from: "Prueba2",
        message: "Esto es una prueba 2 para ver el largo",
        cant: 18,
      },
    ],
  });

  const openMenuNotif = Boolean(notifState.anchorEl);

  const handleMenuNotifOpen = (e) => {
    setNotifState({
      ...notifState,
      anchorEl: e.currentTarget,
    });
  };
  const handleMenuNotifClose = () => {
    setNotifState({
      ...notifState,
      anchorEl: null,
    });
  };

  return (
    <>
      <Tooltip title="Pedidos">
        <IconButton
          color="primary"
          onClick={handleMenuNotifOpen}
          aria-controls={openMenuNotif ? "notif-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={openMenuNotif ? "true" : undefined}
          style={{
            backgroundColor: openMenuNotif ? globalsColors.primaryThin : "",
          }}
        >
          <Badge
            badgeContent={notifState.info.length}
            color="error"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
          >
            <Notifications />
          </Badge>
        </IconButton>
      </Tooltip>

      <Menu
        id="notif-menu"
        anchorEl={notifState.anchorEl}
        open={openMenuNotif}
        onClose={handleMenuNotifClose}
        onClick={handleMenuNotifClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.36))",
            mt: 1.5,
            borderRadius: 2,
            overflowY: "auto",
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {notifState.info.map((item, key) => (
          <MenuItem style={{}}>
            <Box
              style={{
                ...neumorphismDivContainer,
                width: "100%",
                display: "flex",
                alignItems: "center",
                padding: 10,
              }}
            >
              <ListItemAvatar>
                <Avatar
                  style={{
                    backgroundColor: globalsColors.primary,
                  }}
                >
                  {item.cant}
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={item.from} secondary={item.message} />
            </Box>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default NotificationOrder;
