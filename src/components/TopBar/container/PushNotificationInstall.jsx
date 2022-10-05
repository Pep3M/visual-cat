import { Fade, Modal, Typography } from "@material-ui/core";
import { NotificationImportant } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import usePushNotifications from "../../../functions/NotificationsServices/usePushNotifications";
import {
  globalsColors,
  neumorphismDivContainer,
} from "../../../styles/GlobalStyles";

const style = {
  ...neumorphismDivContainer,
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: "60%",
  maxWidth: "75%",
  maxHeight: "80%",
  backgroundColor: globalsColors.lightBasePrimary,
  p: 4,
};

const PushNotificationInstall = (props) => {
  const {
    userConsent,
    pushNotificationSupported,
    userSubscription,
    activeAskUserPermission,
    onClickAskUserPermission,
    onClickSusbribeToPushNotification,
    onClickSendSubscriptionToPushServer,
    pushServerSubscriptionId,
    onClickSendNotification,
    error,
    loading,
  } = usePushNotifications();
  const isConsentGranted = userConsent === "granted";
  
  const [openModal, setOpenModal] = useState(false);


  // Handlers //
  const handleNotifOpen = () => {
    activeAskUserPermission()

    setOpenModal(true);
  };

  return (
    <>
      {!isConsentGranted ? (
        <Tooltip title="Activar notificaciones">
          <IconButton
            color="warning"
            onClick={handleNotifOpen}
            style={{
              padding: 12,
            }}
          >
            <NotificationImportant />
          </IconButton>
        </Tooltip>
      ) : (
        <></>
      )}

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        closeAfterTransition
        open={openModal}
        onClose={(e) => setOpenModal(false)}
      >
        <Fade in={openModal}>
          <Box sx={style}>
            <Typography
              variant="h4"
              style={{
                textAlign: "center",
                marginBottom: 20,
              }}
            >
              Permitir notificaciones
            </Typography>
            <Typography
              variant="body1"
              style={{
                marginBlock: 10,
                color: 'red'
              }}
            >
              {pushNotificationSupported
                ? ""
                : "Tu navegador no soporta notificaciones. Pruebe una version actualizada de Chrome"}
            </Typography>
            <Typography
              variant="body1"
              style={{
                marginBlock: 10
              }}
            >
              Permita las notificaciones en este navegador para que se le avise cuando hay un nuevo pedido
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default PushNotificationInstall;
