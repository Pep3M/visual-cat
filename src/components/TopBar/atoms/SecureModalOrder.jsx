import { Cancel, Delete } from '@mui/icons-material';
import { Backdrop, Box, Button, Divider, Fade, Modal, Typography, useMediaQuery, useTheme } from '@mui/material';
import React from 'react';
import { globalsColors, neumorphismDivContainer } from '../../../styles/GlobalStyles';

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
  
const SecureModalOrder = (props) => {
  const {open, active, delAllSelection} = props
  
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
            Desea borrar esta orden?
          </Typography>
          <Box
            sx={{
              marginTop: 5,
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
}

export default SecureModalOrder;
