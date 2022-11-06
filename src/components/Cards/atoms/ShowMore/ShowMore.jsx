import { Button, Box, Divider } from "@mui/material";
import { ExpandMore, ExpandLess } from "@mui/icons-material";
import React, { useState } from "react";
import { createTheme, ThemeProvider } from "@material-ui/core";
import { globalsColors } from "../../../../styles/GlobalStyles";
import { styled } from "@mui/system";

const ExpandButton = styled(Button)({
  position: "absolute",
  top: -15,
  borderRadius: "50px",
  fontSize: 12,
  backgroundColor: 'grey',
});

const ShowMore = (props) => {
  const { cantidad, callbackShow } = props;
  const [open, setOpen] = useState(false);

  const cant = cantidad > 6 ? cantidad - 6 : "";

  const handlerShow = (e) => {
    setOpen(!open)
    callbackShow(!open)
  }
  
  return (
    <div
      width={"100%"}
      style={{
        display: cant ? "flex" : "none",
        position: "relative",
        justifyContent: "center",
        marginBlock: 20,
      }}
    >
      <Divider style={{ width: "100%" }} />
      <ExpandButton
        variant="contained"
        color= {open ? 'secondary' : "success"}
        endIcon={open ? <ExpandLess /> : <ExpandMore />}
        onClick={handlerShow}
        style={{}}
      >
        {open ? `Mostrar menos` : `Mostrar ${cant} mas`}
      </ExpandButton>
    </div>
  );
};

export default ShowMore;
