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
import { Close, Delete, Send } from "@mui/icons-material";
import { Grid } from "@mui/material";
import { useTheme } from "@mui/system";
import axios from "axios";
import React, { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { connect } from "react-redux";
import { url_base } from "../../api/env";
import { setOpenModalCart, delAllSelection } from "../../store/actions";
import {
  globalsColors,
  neumorphismDivContainer,
  scrollBarStyle,
} from "../../styles/GlobalStyles";
import ItemPedido from "./atoms/ItemPedido/ItemPedido";
import SecureModal from "./atoms/SecureModal/SecureModal";

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
  const { pelis, openState, setOpenModalCart, delAllSelection } = props;

  const theme = useTheme();
  const bp600down = useMediaQuery(theme.breakpoints.down(600));

  const [openSecureClean, setOpenSecureClean] = useState(false);
  const [state, setState] = useState({
    price: 0,
    priceHD: 0,
  });

  const handleClose = () => setOpenModalCart(false);
  const handleAllClean = (e) => {
    console.log("abriendo secure");
    setOpenSecureClean(true);
  };
  const handleCloseSecure = (e) => {
    console.log("cerrando secure");
    setOpenSecureClean(false);
  };
  const getPrice = (size) => (size < 2500 ? state.price : state.priceHD);

  const total = () => {
    let totalFinal = 0;
    pelis.forEach((peli) => {
      totalFinal += Number(getPrice(peli.Size));
    });
    return totalFinal;
  };

  useEffect(() => {
    if (pelis.length === 0) {
      setOpenModalCart(false);
    }
  }, [pelis]);

  useEffect(() => {
    axios
      .get(url_base + "getconfig")
      .then((response) => {
        if (response.status === 201) {
          setState({
            ...state,
            price: response.data.price,
            priceHD: response.data.priceHD,
          });
        }
      })
      .catch((err) => {
        console.error("No se pudo obtener la configuracion API:", err);
      });
  }, []);

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
              <ItemPedido
                key={i}
                index={i + 1}
                nombre={item.Nombre}
                precio={getPrice(item.Size)}
              />
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
              {total() ?? 0} CUP
            </Typography>
          </Box>
          <Box
            sx={{
              marginTop: 40,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {bp600down ? (
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleAllClean}
              >
                <Delete />
              </Button>
            ) : (
              <Button
                variant="outlined"
                color="secondary"
                startIcon={<Delete />}
                onClick={handleAllClean}
              >
                Limpiar
              </Button>
            )}

            {bp600down ? (
              <Button variant="contained" color="primary">
                <Send />
              </Button>
            ) : (
              <Button variant="contained" color="primary" startIcon={<Send />}>
                Enviar
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

          <SecureModal open={openSecureClean} active={handleCloseSecure} />
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalCart);
