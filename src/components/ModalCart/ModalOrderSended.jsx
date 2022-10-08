import { Divider, Modal } from "@material-ui/core";
import { Close } from "@mui/icons-material";
import {
  Backdrop,
  Box,
  Button,
  Fade,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import {
  globalsColors,
  neumorphismDivContainer,
} from "../../styles/GlobalStyles";
import { connect } from "react-redux";
import { setOpenSended } from "../../store/actions";

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

const ModalOrderSended = (props) => {
  const { open, setOpenSended } = props;

  const theme = useTheme();
  const bp600down = useMediaQuery(theme.breakpoints.down(600));

  const handleClose = () => setOpenSended(false);
  const handlePressEnter = (e) => {
    if (e.keyCode === 13) handleClose();
  };
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={Boolean(open)}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={Boolean(open)}>
        <Box sx={style} 
            onKeyUp={handlePressEnter}>
          <Typography
            variant="h4"
            style={{
              color: globalsColors.primary,
              textAlign: "center",
            }}
          >
            !Pedido enviado!
          </Typography>
          <Typography
            variant="body2"
            style={{
              color: globalsColors.primary,
              textAlign: "center",
            }}
          >
            Su orden ha sido enviada con exito. 
          </Typography>

          <Divider
            style={{
              marginBlock: 20,
              backgroundColor: globalsColors.primary,
            }}
          />

          <Typography
            variant="body1"
            style={{
              color: globalsColors.primary,
              textAlign: "center",
              marginTop: 20,
            }}
          >
            No olvide entregarle su dispositivo USB al trabajador para que le copien su pedido, y digale el nombre que le puso a su orden ({<strong>{open}</strong>}).
          </Typography>

          <Box
            sx={{
              marginTop: 5,
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            {bp600down ? (
              <Button variant="contained" color="success" onClick={handleClose}>
                <Close />
              </Button>
            ) : (
              <Button
                variant="contained"
                color="success"
                startIcon={<Close />}
                onClick={handleClose}
              >
                Entendido
              </Button>
            )}

            <IconButton
              variant="outlined"
              color="primary"
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                margin: 2,
              }}
              onClick={handleClose}
            >
              <Close />
            </IconButton>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  open: state.openSended,
})

const mapDispatchToProps = {
  setOpenSended,
};


export default connect(mapStateToProps, mapDispatchToProps)(ModalOrderSended);
