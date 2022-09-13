import { IconButton } from "@material-ui/core";
import { Close } from "@mui/icons-material";
import { Divider, Typography } from "@mui/material";
import React from "react";
import {
  globalsColors,
  neumorphismDivItem,
} from "../../../../styles/GlobalStyles";
import {
  deletePeliSelection,
  setOpenModalCart,
} from "../../../../store/actions";
import { connect } from "react-redux";

const ItemPedido = (props) => {
  const { index, nombre, precio, deletePeliSelection } = props;

  const handleClose = (e) => {
    deletePeliSelection({
      Nombre: nombre,
    });
  };

  return (
    <div
      style={{
        ...neumorphismDivItem,
        boxShadow: "",
        borderBottom: `${globalsColors.primaryThin} 1px solid`,
        marginBlock: 12,
        borderRadius: 0,
        padding: 4,
        display: "flex",
        alignItems: "center",
      }}
    >
      <IconButton
        aria-label="Quitar"
        style={{
          color: globalsColors.redPrimary,
          padding: 2,
          marginBottom: -3,
          marginRight: 10,
        }}
        onClick={handleClose}
      >
        <Close />
      </IconButton>
      <Typography variant="text" style={{ color: globalsColors.primary }}>
        {index}
      </Typography>
      <Divider
        orientation="vertical"
        flexItem
        style={{
          marginInline: 5,
          backgroundColor: globalsColors.primaryThin,
        }}
      />

      <Typography
        variant="text"
        style={{
          color: globalsColors.primary,
          width: "calc(100% - 50px)",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {nombre}
      </Typography>
      <Divider
        orientation="vertical"
        flexItem
        style={{
          marginInline: 5,
          backgroundColor: globalsColors.primaryThin,
        }}
      />

      <Typography
        variant="text"
        style={{
          color: globalsColors.primary,
          whiteSpace: "nowrap",
        }}
      >
        {precio ?? 0}{" "}
        <Typography variant="text" style={{ fontSize: 11 }}>
          CUP
        </Typography>
      </Typography>
    </div>
  );
};

const mapDispatchToProps = {
  deletePeliSelection,
};

export default connect(null, mapDispatchToProps)(ItemPedido);
