import {
  Backdrop,
  Box,
  Divider,
  Fade,
  Modal,
  Typography,
} from "@material-ui/core";
import { Grid } from "@mui/material";
import React, { useState } from "react";
import { connect } from "react-redux";
import { setOpenModalCart } from "../../store/actions";
import {
  globalsColors,
  neumorphismDivContainer,
  scrollBarStyle,
} from "../../styles/GlobalStyles";
import ItemPedido from "./atoms/ItemPedido/ItemPedido";

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

const ModalCart = (props) => {
  const { pelis, openState, setOpenModalCart } = props;

  const handleClose = () => setOpenModalCart(false);

  const total = pelis ? pelis.length * 3 : 0;

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={openState}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={openState}>
        <Box sx={style}>
          <Typography
            variant="h4"
            style={{
              color: globalsColors.primary,
              textAlign: "center",
            }}
          >
            Pedido
          </Typography>
          <Divider
            style={{
              marginBlock: 20,
              backgroundColor: globalsColors.primary,
            }}
          />
          <Box
            sx={{
              ...scrollBarStyle,
              maxHeight: "500px",
              overflow: "auto",
            }}
          >
            {pelis.map((item, i) => (
              <ItemPedido key={i} index={i + 1} nombre={item.Nombre} precio={3} />
            ))}
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h6"
              style={{
                color: globalsColors.primary,
                textAlign: "right",
                width: "100%",
                marginRight: 8,
              }}
            >
              Total:
            </Typography>
            <Typography
              variant="h6"
              style={{
                color: globalsColors.primary,
                whiteSpace: "nowrap",
              }}
            >
              {total ?? 0}{" "} CUP
            </Typography>
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
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalCart);
