import {
  Backdrop,
  Box,
  Button,
  Divider,
  Fade,
  IconButton,
  Modal,
  TextField,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import { Close, CreateNewFolder } from "@mui/icons-material";
import { useTheme } from "@mui/system";
import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import {
  globalsColors,
  neumorphismDivContainer,
} from "../../styles/GlobalStyles";
import { urlWinFormater } from "../../functions/formater";

const style = {
  ...neumorphismDivContainer,
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  minWidth: "250px",
  maxWidth: "600px",
  maxHeight: "80%",
  backgroundColor: globalsColors.lightBasePrimary,
  p: 4,
};

const optionsAddCategory = {
  method: "POST",
  url: "http://localhost:3001/addcategory",
  headers: { "Content-Type": "application/json" },
};

const ModalAddCategory = (props) => {
  const { name, open, closeCallback, updateData } = props;

  const theme = useTheme();
  const bp600down = useMediaQuery(theme.breakpoints.down(600));

  const [openState, setOpenState] = useState(open);
  const [errorCat, setErrorCat] = useState(false);
  const [errorPath, setErrorPath] = useState(false);

  const valueCat = useRef("");
  const valuePath = useRef("");

  const handleClose = () => {
    setOpenState(false);
    closeCallback(false);
  };

  useEffect(() => {
    setOpenState(open);
  }, [open]);

  /**
   * Envía una solicitud POST al servidor con el objeto de categoria y videos como cuerpo de la solicitud.
   */
  const addCategory = () => {
    if (valueCat.current === "") setErrorCat(true);
    if (valuePath.current === "") setErrorPath(true);

    if (valueCat.current !== "" && valuePath.current !== "") {
      const data = {
        name,
        category: valueCat.current,
        path: urlWinFormater(valuePath.current),
      };

      const optionsToSend = {
        ...optionsAddCategory,
        data,
      };

      axios
        .request(optionsToSend)
        .then((response) => {
          if (response.data) {
            const name = Object.keys(response.data)[0]
            
            console.log(name);
            console.log(response.data[name]);
            setOpenState(false);
            updateData({
              name,
              data: response.data[name],
            });
            closeCallback(false);
          } else {
            console.log('no hay data devuelta d la api, error')
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const handlerValueCat = (e) => {
    valueCat.current = e.target.value;
    setErrorCat(false);
  };

  const handlerValuePath = (e) => {
    valuePath.current = e.target.value;
    setErrorPath(false);
  };

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
            {name}
          </Typography>
          <Divider
            style={{
              marginBlock: 20,
              backgroundColor: globalsColors.primary,
            }}
          />
          <Box component="form" sx={{}} noValidate autoComplete="off">
            <TextField
              id="input-category"
              label="Nueva categoria"
              error={errorCat}
              variant="standard"
              fullWidth
              helperText={
                errorCat
                  ? "Nombre vacio"
                  : "Por favor, ingrese el nombre de la nueva categoria"
              }
              onChange={handlerValueCat}
            />

            <TextField
              id="input-path"
              label="Ruta"
              variant="standard"
              error={errorPath}
              fullWidth
              helperText={
                errorPath
                  ? "Ruta vacia"
                  : "Pegue la ruta de la carpeta que desea agregar. Ej: 'D:\\PELIS'"
              }
              onChange={handlerValuePath}
            />
          </Box>
          <Box
            sx={{
              marginTop: 40,
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              startIcon={<CreateNewFolder />}
              onClick={addCategory}
            >
              Agregar
            </Button>

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

export default ModalAddCategory;
