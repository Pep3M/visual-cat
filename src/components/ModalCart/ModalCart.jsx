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
import { TextField } from "@mui/material";
import { useTheme } from "@mui/system";
import axios from "axios";
import React, { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { connect } from "react-redux";
import { url_base } from "../../api/env";
import { setOpenModalCart, setOpenSended, delAllSelection } from "../../store/actions";
import {
  globalsColors,
  neumorphismDivContainer,
  scrollBarStyle,
} from "../../styles/GlobalStyles";
import ItemPedido from "./atoms/ItemPedido/ItemPedido";
import SecureModal from "./atoms/SecureModal/SecureModal";
import moment from "moment";

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
  const { pelis, openState, setOpenModalCart, delAllSelection, setOpenSended } = props;

  const theme = useTheme();
  const bp600down = useMediaQuery(theme.breakpoints.down(600));

  const [openSecureClean, setOpenSecureClean] = useState(false);
  const [state, setState] = useState({
    price: 0,
    priceHD: 0,
  });
  const [errorNombrePedido, setErrorNombrePedido] = useState(false);
  const nombrePedido = useRef("");
  
  const handleActionSend = () => {
    if (nombrePedido.current === "") return setErrorNombrePedido(true);

    const data = {
      order: moment().format("hhmm-SSS"),
      time: moment().format("hh:mm A"),
      name: nombrePedido.current,
      videos: [...pelis],
    };

    const options = {
      method: "POST",
      url: url_base + "addorder",
      headers: { "Content-Type": "application/json" },
      data,
    };

    axios.request(options).then((response) => {
      if (response.status === 201) {
        setOpenSended(nombrePedido.current)
        delAllSelection(null)
      }
    });
  };

  const handleClose = () => setOpenModalCart(false);
  const handleAllClean = (e) => {
    console.log("abriendo secure");
    setOpenSecureClean(true);
  };
  const handleCloseSecure = (e) => {
    console.log("cerrando secure");
    setOpenSecureClean(false);
  };
  const handleChangeNombrePedido = (e) => {
    nombrePedido.current = e.target.value
    setErrorNombrePedido(false)
  }
  
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

          <TextField
            error={errorNombrePedido}
            helperText={errorNombrePedido ? 'No olvide ponerle un nombre a su pedido' : ''}
            variant="standard"
            label="Nombre del pedido"
            fullWidth
            focused
            style={{
              marginBottom: 10,
            }}
            onChange={handleChangeNombrePedido}
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
              <Button
                variant="contained"
                color="primary"
                onClick={handleActionSend}
              >
                <Send />
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                startIcon={<Send />}
                onClick={handleActionSend}
              >
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
  setOpenSended,
  delAllSelection,
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalCart);
