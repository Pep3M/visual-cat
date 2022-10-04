import {
  Box,
  Button,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { Check, ContentCopy, CopyAll, Delete, Paid } from "@mui/icons-material";
import { Badge, ListItemText, Tooltip, ListItemButton } from "@mui/material";
import React, { useState } from "react";
import {
  globalsColors,
  neumorphismDivItem,
} from "../../../styles/GlobalStyles";
import SecureModal from "../../ModalCart/atoms/SecureModal/SecureModal";
import SecureModalOrder from "./SecureModalOrder";

const ItemModalOrder = (props) => {
  const { nombre, ruta, precio } = props;

  const [state, setState] = useState({
    copy: "Copiar",
  });

  const handleClick = () => {
    navigator.clipboard.writeText(ruta);
    setState({
      ...state,
      copy: "Copiado",
    });
  };

  return (
    <ListItemButton
      onClick={handleClick}
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
      <Tooltip title={state.copy}>
        <IconButton style={{ marginRight: 20 }} onClick={handleClick}>
          <Badge
            invisible={state.copy === "Copiar"}
            badgeContent={<Check />}
            color="success"
            anchorOrigin={{
              horizontal: "right",
              vertical: "bottom",
            }}
          >
            <ContentCopy />
          </Badge>
        </IconButton>
      </Tooltip>
      <ListItemText primary={nombre} secondary={ruta} />

      <Typography
        variant="body1"
        style={{
          whiteSpace: "nowrap",
        }}
      >
        {precio ?? 0}{" "}
        <Typography variant="body" style={{ fontSize: 11 }}>
          CUP
        </Typography>
      </Typography>
    </ListItemButton>
  );
};

export default ItemModalOrder;
