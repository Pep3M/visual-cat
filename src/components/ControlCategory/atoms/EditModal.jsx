import {
  Backdrop,
  Box,
  Button,
  Divider,
  Fade,
  ListItemIcon,
  Modal,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { Add, Cancel, Close, Edit, Save, Send } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  IconButton,
  Input,
  List,
  ListItem,
  ListItemButton,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  globalsColors,
  neumorphismDivContainer,
  neumorphismDivItem,
} from "../../../styles/GlobalStyles";
import ItemListEdit from "../electron/ItemListEdit";

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

const EditModal = (props) => {
  const { open, type, data, name, onClose, dataCallback, fetching } = props;

  const theme = useTheme();
  const bp600down = useMediaQuery(theme.breakpoints.down(600));

  const [nameCategory, setNameCategory] = useState(name);
  const [rutas, setRutas] = useState(data.paths);

  useEffect(() => {
    setNameCategory(name);
  }, [name]);

  const handleAction = (e) => {
    dataCallback({
      nameCategory,
      rutas,
    });
  };
  const handleOnClose = (e) => {
    onClose(true);
  };
  const handleAddPath = (e) => {
    setRutas([...rutas, ""]);
  };
  const handleRemovePath = (callback) => {
    if (rutas.length !== 1) {
      setRutas(rutas.filter((value, index) => index !== callback));
    } else {
      setRutas([""]);
    }
  };
  const handleInputCallback = (callback) => {
    const { text, position } = callback;
    let newArr = [];
    rutas.forEach((ruta, index) => {
      if (index === position) {
        newArr.push(text);
      } else {
        newArr.push(ruta);
      }
    });
    setRutas(newArr);
  };

  const handleOnChangeCategory = (value) => {
    setNameCategory(value);
  };

  const handlePressEnter = (e) => {
    if (e.keyCode === 13) handleAction();
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
        <Box
          sx={{
            ...style,
            width: bp600down ? "60%" : 400,
          }}
          
          onKeyUp={handlePressEnter}
        >
          <Typography
            variant="h5"
            style={{
              color: globalsColors.primary,
              textAlign: "center",
            }}
          >
            Editando {type.toLowerCase()}
          </Typography>
          <Divider
            style={{
              marginBlock: 20,
              backgroundColor: globalsColors.primary,
            }}
          />

          <TextField
            label="Nombre de la categoria"
            color="primary"
            fullWidth
            defaultValue={nameCategory}
            onChange={(e) => handleOnChangeCategory(e.target.value)}
            style={{
              marginBottom: 20,
            }}
          />

          <Box
            style={{
              ...neumorphismDivContainer,
              padding: 20,
              maxHeight: 400,
              overflowY: "auto",
            }}
          >
            <Typography variant="h6" style={{ color: globalsColors.primary }}>
              Rutas de escucha
            </Typography>

            <List>
              {rutas.map((path, key) => (
                <ItemListEdit
                  key={key}
                  position={key}
                  ruta={path}
                  remove={handleRemovePath}
                  inputCallback={handleInputCallback}
                />
              ))}
              <ListItemButton onClick={handleAddPath}>
                <ListItemIcon>
                  <Add />
                </ListItemIcon>
                Agregar ruta
              </ListItemButton>
            </List>
          </Box>

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

            <LoadingButton
              variant="contained"
              color="primary"
              startIcon={<Save />}
              loadingPosition='start'
              loading={fetching}
              onClick={handleAction}
            >
              Guardar
            </LoadingButton>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default EditModal;
