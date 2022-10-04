import { IconButton, Tooltip } from "@material-ui/core";
import { Notifications } from "@mui/icons-material";
import {
  Avatar,
  Badge,
  Box,
  ListItemAvatar,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { url_base, ws_base } from "../../../api/env";
import {
  globalsColors,
  neumorphismDivContainer,
} from "../../../styles/GlobalStyles";
import ModalOrder from "../molecules/ModalOrder";
import { w3cwebsocket } from "websocket";

const client = new w3cwebsocket(ws_base);

const NotificationOrder = (props) => {
  const [notifState, setNotifState] = useState({
    anchorEl: null,
    info: [],
  });
  const [stateModal, setStateModal] = useState({
    open: false,
    data: [],
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
  const handleClickItem = (e, name, order, data) => {
    setStateModal({
      ...stateModal,
      open: true,
      name,
      order,
      data,
    });
  };

  const handleCloseModal = () => {
    setStateModal({
      ...stateModal,
      open: false,
    });
  };

  useEffect(() => {
    axios
      .get(url_base + "getorders")
      .then((response) => {
        if (response.status === 201) {
          setNotifState({
            ...notifState,
            info: response.data,
          });
        }
      })
      .catch((err) => console.error("Error al obtener ordenes del API:", err));

    client.onopen = () => {
      console.log("Conectado con el websocket server");
    };
    client.onmessage = (message) => {
      const info = JSON.parse(message.data);

      setNotifState({
        ...notifState,
        info,
      });
    };
  }, []);

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
          <MenuItem
            key={key}
            onClick={(e) => handleClickItem(e, item.name, item.order, item.videos)}
            style={{}}
          >
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
                  {item.videos.length}
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={item.name} secondary={item.time} />
            </Box>
          </MenuItem>
        ))}
      </Menu>
      <ModalOrder
        cliente={stateModal.name}
        order={stateModal.order}
        openProps={stateModal.open}
        closed={handleCloseModal}
        pelis={stateModal.data}
      />
    </>
  );
};

export default NotificationOrder;
