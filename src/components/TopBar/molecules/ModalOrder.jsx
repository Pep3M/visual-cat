import {
  Button,
  Divider,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { Close, Delete, Paid } from "@mui/icons-material";
import { Modal, Fade } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { url_base, url_base_local } from "../../../api/env";
import {
  globalsColors,
  neumorphismDivContainer,
  scrollBarStyle,
} from "../../../styles/GlobalStyles";
import ItemModalOrder from "../atoms/ItemModalOrder";
import SecureModalOrder from "../atoms/SecureModalOrder";

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
///importar modalOrder en notificationorder
const ModalOrder = (props) => {
  const { cliente, order, openProps, closed, pelis } = props;

  const theme = useTheme();
  const bp600down = useMediaQuery(theme.breakpoints.down(600));

  const [state, setState] = useState({
    price: 0,
    priceHD: 0,
    openDel: false,
  });

  const handleClose = () => {
    closed(true);
  };

  const handleDelete = () => {
    setState({
      ...state,
      openDel: true,
    });
  };
  const handleCloseSecure = () => {
    setState({
      ...state,
      openDel: false,
    });
  };
  const delAllSelection = () => {
    const options = {
      method: "DELETE",
      url: url_base + "delorder",
      headers: { "Content-Type": "application/json" },
      data: {
        order,
      },
    };

    axios.request(options).then((response) => {
      if (response.status === 201) {
        setState({
          ...state,
          openDel: false,
        });
        closed(true)
      }
    });
  };

  const handlePaid = () => {
    const options = {
      method: "DELETE",
      url: url_base + "delorder",
      headers: { "Content-Type": "application/json" },
      data: {
        order,
      },
    };

    axios.request(options).then((response) => {
      if (response.status === 201) {
        closed(true);
      }
    });
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
    axios
      .get(url_base_local + "getconfig")
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
      closeAfterTransition
      open={openProps}
      onClose={handleClose}
    >
      <Fade in={openProps}>
        <Box sx={style}>
          <Typography
            variant="h4"
            style={{
              color: globalsColors.primary,
              textAlign: "center",
            }}
          >
            {cliente}
          </Typography>
          <Typography
            variant="body2"
            style={{
              color: globalsColors.primary,
              textAlign: "center",
            }}
          >
            Orden {order}
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
              <ItemModalOrder
                key={i}
                nombre={item.Nombre}
                ruta={item.Direccion}
                precio={getPrice(item.Size)}
              />
            ))}
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              marginTop: 2,
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
              marginTop: 5,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {bp600down ? (
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleDelete}
              >
                <Delete />
              </Button>
            ) : (
              <Button
                variant="outlined"
                color="secondary"
                startIcon={<Delete />}
                onClick={handleDelete}
              >
                Eliminar
              </Button>
            )}

            {bp600down ? (
              <Button variant="contained" color="primary" onClick={handlePaid}>
                <Paid />
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                startIcon={<Paid />}
                onClick={handlePaid}
              >
                Cobrar
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

          <SecureModalOrder
            open={state.openDel}
            active={handleCloseSecure}
            delAllSelection={delAllSelection}
          />
        </Box>
      </Fade>
    </Modal>
  );
};

export default ModalOrder;
