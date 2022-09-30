import {
  Backdrop,
  Box,
  Button,
  Divider,
  Fade,
  Modal,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import { Cancel, Close, Delete } from "@mui/icons-material";
import { Grid } from "@mui/material";
import { useTheme } from "@mui/system";
import { useState, useEffect } from "react";
import {
  globalsColors,
  neumorphismDivContainer,
  scrollBarStyle,
} from "../../../styles/GlobalStyles";

const style = {
  ...neumorphismDivContainer,
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 280,
  maxHeight: "80%",
  backgroundColor: globalsColors.lightBasePrimary,
  p: 4,
};

const DelConfirmation = (props) => {
  const { open, type, data, name, delCategory, delItem, onClose, totalsSus } =
    props;

  const theme = useTheme();
  const bp600down = useMediaQuery(theme.breakpoints.down(600));

  const handleAction = (e) => {
    //console.log("Accion:", name, e);
    if (type === "Categoria") {
      delCategory(true);
      totalsSus({
        category: 1,
        item: data.videos.length,
      });
    } else {
      delItem({
        name,
        visible: false,
      });
      totalsSus({
        category: 0,
        item: 1,
      });
    }
    onClose(true);
  };

  const handleOnClose = (e) => {
    onClose(true);
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleOnClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Box sx={{
          ...style,
          width: bp600down ? '60%' : 400,
        }}>
          <Typography
            variant="h5"
            style={{
              color: globalsColors.primary,
              textAlign: "center",
            }}
          >
            Confirmar
          </Typography>
          <Divider
            style={{
              marginBlock: 20,
              backgroundColor: globalsColors.primary,
            }}
          />
          <Typography variant="text" style={{ color: globalsColors.primary }}>
            {`Desea eliminar ${name} (${type})?`}
          </Typography>
          <Box
            sx={{
              marginTop: 40,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button
              variant="outlined"
              color="primary"
              startIcon={<Cancel />}
              onClick={handleOnClose}
            >
              Cancelar
            </Button>

            <Button
              variant="contained"
              color="secondary"
              startIcon={<Delete />}
              onClick={handleAction}
            >
              Eliminar
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default DelConfirmation;
