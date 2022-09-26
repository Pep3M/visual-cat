import React, { useState } from "react";
import { ListItemButton, Menu, MenuItem } from "@mui/material";
import {
  Avatar,
  Box,
  Collapse,
  Divider,
  IconButton,
  List,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@material-ui/core";
import {
  Add,
  Delete,
  Edit,
  ExpandLess,
  ExpandMore,
  Folder,
  MoreVert,
  Movie,
} from "@mui/icons-material";
import { useRef } from "react";

const ItemControlCategory = (props) => {
  const { category, data } = props;

  const [open, setOpen] = useState(false);

  //Menu Categories
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

  //Menu Items
  const [anchorElItem, setAnchorElItem] = useState(null);
  const openMenuItem = Boolean(anchorElItem);
  const dataItem = useRef({});

  //Handlers Menu Categories
  const handlerMenuOpen = (e, name) => {
    setAnchorEl(e.currentTarget);
    console.log(name);
  };
  const handlerMenuClose = () => {
    setAnchorEl(null);
  };

  //Handlers Menu Items
  const handlerMenuOpenItem = (e, name) => {
    setAnchorElItem(e.currentTarget);
    dataItem.current = {
      name,
    };
  };
  const handlerMenuCloseItem = () => {
    setAnchorElItem(null);
    dataItem.current = {};
  };

  //Actions Menu Categories
  const menuAdd = (e, name) => {
    console.log("add", name);
    handlerMenuClose();
  };
  const menuEdit = (e, name) => {
    console.log("edit", name);
    handlerMenuClose();
  };
  const menuDel = (e, name) => {
    console.log("del", name);
    handlerMenuClose();
  };

  //Actions Menu Items
  const itemEdit = (e) => {
    console.log("edit item", dataItem.current.name);
    handlerMenuCloseItem();
  };
  const itemDel = (e, name) => {
    console.log("del item", dataItem.current.name);
    handlerMenuCloseItem();
  };

  return (
    <>
      <Box style={{ position: "relative" }}>
        <ListItemButton onClick={() => setOpen(!open)}>
          <ListItemAvatar>
            <Avatar>
              <Folder />
            </Avatar>
          </ListItemAvatar>
          <ListItemText>
            <Typography
              variant="body1"
              style={{
                width: "calc(100% - 10px)",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {category}
            </Typography>
          </ListItemText>
          <div style={{ marginRight: 40 }}>
            {open ? <ExpandLess /> : <ExpandMore />}
          </div>
        </ListItemButton>

        <IconButton
          id="icon-button"
          onClick={(e) => handlerMenuOpen(e, category)}
          aria-controls={openMenu ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={openMenu ? "true" : undefined}
          style={{
            position: "absolute",
            top: 5,
            bottom: 5,
            right: 5,
          }}
        >
          <MoreVert />
        </IconButton>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={openMenu}
          onClose={handlerMenuClose}
          MenuListProps={{
            "aria-labelledby": "icon-button",
          }}
        >
          <MenuItem onClick={(e) => menuAdd(e, category)}>
            <ListItemIcon>
              <Add />
            </ListItemIcon>
            Agregar
          </MenuItem>

          <Divider />

          <MenuItem onClick={(e) => menuEdit(e, category)}>
            <ListItemIcon>
              <Edit />
            </ListItemIcon>
            Editar
          </MenuItem>

          <MenuItem onClick={(e) => menuDel(e, category)}>
            <ListItemIcon>
              <Delete />
            </ListItemIcon>
            Eliminar
          </MenuItem>
        </Menu>
      </Box>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {data.map((item, key) => (
            <ListItemButton
              key={key}
              id={"item-button"}
              onClick={(e) => handlerMenuOpenItem(e, item.Nombre)}
              aria-controls={openMenuItem ? "item-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={openMenuItem ? "true" : undefined}
              sx={{ pl: 4 }}
            >
              <ListItemIcon>
                <Movie />
              </ListItemIcon>
              <ListItemText>
                <Typography
                  variant="body1"
                  style={{
                    width: "calc(100% - 10px)",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {item.Nombre}
                </Typography>
              </ListItemText>
            </ListItemButton>
          ))}
          <Menu
            id="item-menu"
            anchorEl={anchorElItem}
            open={openMenuItem}
            onClose={handlerMenuCloseItem}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem onClick={(e) => itemEdit(e)}>
              <ListItemIcon>
                <Edit />
              </ListItemIcon>
              Editar
            </MenuItem>

            <MenuItem onClick={(e) => itemDel(e)}>
              <ListItemIcon>
                <Delete />
              </ListItemIcon>
              Eliminar
            </MenuItem>
          </Menu>
        </List>
      </Collapse>
    </>
  );
};

export default ItemControlCategory;
