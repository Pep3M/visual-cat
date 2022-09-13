import React, { useState } from "react";
import Fab from "@mui/material/Fab";
import { globalsColors } from "../../styles/GlobalStyles";
import { ShoppingCart } from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material";
import { Box, Typography } from "@material-ui/core";
import ModalCart from "../ModalCart/ModalCart";
//redux
import { connect } from "react-redux";
import { setOpenModalCart } from "../../store/actions";

const theme = createTheme({
  palette: {
    primary: {
      main: globalsColors.primary,
    },
  },
  components: {
    MuiFab: {
      styleOverrides: {
        root: {},
      },
    },
  },
});

const FabCustom = (props) => {
  const { count, open, setOpenModalCart } = props;

  const handlerOpenModalCart = () => {
    setOpenModalCart(true)
  }
  
  return (
    <ThemeProvider theme={theme}>
        <Fab variant="extended" color="primary" sx={{
          transform: count === 0 || open ? 'scale(0)' : 'scale(1)',
          position: "fixed",
          bottom: 0,
          right: 0,
          margin: 2,
          transition: '0.2s ease-in-out'
        }}
        onClick={handlerOpenModalCart}
        >
          <ShoppingCart />
          <Typography variant="h5" style={{
            marginLeft: 5,
          }}>
            {count}
          </Typography>
        </Fab>
        {
          open ? <ModalCart /> : <></>
        }
    </ThemeProvider>
  );
};

const mapStateToProps = state => ({
  count: state.pelis.length || 0,
  open: state.openModalCart,
})
const mapDispatchToProps = ({
  setOpenModalCart,
})

export default connect(mapStateToProps, mapDispatchToProps)(FabCustom)
