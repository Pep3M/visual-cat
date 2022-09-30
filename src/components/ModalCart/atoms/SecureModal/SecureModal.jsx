import {
  Backdrop,
  Box,
  Button,
  Divider,
  Fade,
  IconButton,
  Modal,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import { Cancel, Close, Delete, Send } from "@mui/icons-material";
import { Grid } from "@mui/material";
import { useTheme } from "@mui/system";
import React, { useEffect } from "react";
import { useState } from "react";
import { connect } from "react-redux";
import { setOpenModalCart, delAllSelection } from "../../../../store/actions";
import {
  globalsColors,
  neumorphismDivContainer,
  scrollBarStyle,
} from "../../../../styles/GlobalStyles";
import ItemPedido from "../../atoms/ItemPedido/ItemPedido";

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

const SecureModal = (props) => {
  const { open, active, delAllSelection } = props;

  const theme = useTheme();
  const bp600down = useMediaQuery(theme.breakpoints.down(600));


  const handleAllClean = (e) => delAllSelection(null);
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={active}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Box sx={{...style, width: bp600down ? '60%' : 400}}>
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
            Desea borrar todo el pedido hecho hasta ahora?
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
              onClick={active}
            >
              Cancelar
            </Button>

            <Button
              variant="contained"
              color="secondary"
              startIcon={<Delete />}
              onClick={handleAllClean}
            >
              Limpiar
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  pelis: state.pelis,
  openState: state.openModalCart,
});

const mapDispatchToProps = {
  setOpenModalCart,
  delAllSelection,
};

export default connect(mapStateToProps, mapDispatchToProps)(SecureModal);
