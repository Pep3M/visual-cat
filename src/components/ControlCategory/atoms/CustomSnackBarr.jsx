import { Alert, Slide, Snackbar } from "@mui/material";
import React, { useState } from "react";

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

const CustomSnackBarr = (props) => {
  const { message, severity, duration } = props;
  const [state, setState] = useState({
    open: true,
  });

  const handleClose = () => {
    setState({
      ...state,
      open: false,
    });
  };

  return (
    <Snackbar
      open={state.open}
      onClose={handleClose}
      TransitionComponent={SlideTransition}
      autoHideDuration={duration}
      message={message}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      style={{
        zIndex: 1000,
      }}
    >
      <Alert severity={severity} variant="filled">
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackBarr;
