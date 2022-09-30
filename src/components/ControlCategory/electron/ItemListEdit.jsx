import { Divider, IconButton, Input, TextField } from "@material-ui/core";
import {
  Close,
  Delete,
  FolderCopyOutlined,
  FolderOutlined,
} from "@mui/icons-material";
import { InputAdornment } from "@mui/material";
import {
  globalsColors,
  neumorphismDivItem,
} from "../../../styles/GlobalStyles";

const ItemListEdit = (props) => {
  const { position, ruta, remove, inputCallback } = props;
  
  const handleClose = (e) => {
    remove(position);
  };

  return (
    <div
      style={{
        ...neumorphismDivItem,
        boxShadow: "",
        borderBottom: `${globalsColors.primaryThin} 0px solid`,
        marginBlock: 10,
        borderRadius: 0,
        padding: 0,
        display: "flex",
        alignItems: "center",
      }}
    >
      <TextField
        label="Ruta"
        defaultValue={ruta}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <FolderOutlined />
            </InputAdornment>
          ),
        }}
        style={{
          color: globalsColors.primary,
          width: "calc(100% - 20px)",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
        onChange={(e) =>
          inputCallback({
            text: e.target.value,
            position,
          })
        }
      >
        {ruta}
      </TextField>

      <IconButton
        aria-label="Quitar"
        style={{
          color: globalsColors.redPrimary,
          marginBottom: -3,
        }}
        onClick={handleClose}
      >
        <Delete />
      </IconButton>
    </div>
  );
};

export default ItemListEdit;
