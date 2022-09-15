import { Box, Button, IconButton, Typography } from "@material-ui/core";
import { Folder } from "@mui/icons-material";
import React from "react";
import { neumorphismDivContainer } from "../../../styles/GlobalStyles";

const DropArea = (props) => {
  const { name } = props;

  const handlerChangeInput = (e) => {
    console.log(e);
  }

  return (
    <Button
      variant="contained"
      component="label"
      style={{
        ...neumorphismDivContainer,
        height: 200,
        marginTop: 10,
        padding: 10,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
      /* onDrop={(event) => handleDrop(event)}
      onDragOver={(event) => handleDragOver(event)}
      onDragEnter={(event) => handleDragEnter(event)} */
    >
      <input type="file" webkitdirectory="" directory="" multiple hidden onChange={handlerChangeInput} />

      <IconButton>
        <Folder
          color="primary"
          style={{
            width: 50,
            height: 50,
          }}
        />
      </IconButton>
      <Typography
        variant="subtitle"
        color="primary"
        style={{ width: "55%", textAlign: "center" }}
      >
        Toque la carpeta para elegir, o arrastre una de {name.toLowerCase()} a
        este recuadro
      </Typography>
    </Button>
  );
};

export default DropArea;
