import React, { useState } from "react";
import { ListItemButton, Menu, MenuItem } from "@mui/material";
import {
  Avatar,
  Box,
  Collapse,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
} from "@material-ui/core";
import {
  Add,
  Cancel,
  Delete,
  Edit,
  ExpandLess,
  ExpandMore,
  Folder,
  MoreVert,
  Movie,
  Save,
} from "@mui/icons-material";
import { useRef } from "react";
import DelConfirmation from "../atoms/DelConfirmation";
import EditModal from "../atoms/EditModal";
import axios from "axios";
import { url_base_local } from "../../../api/env";

const emptyActions = {
  edit: false,
  delConfirmation: false,
  name: "",
  type: "",
  data: {},
};

const ItemControlCategory = (props) => {
  const { category, data, totalsSus } = props;
  const [newCategory, setNewCategory] = useState(category);
  const [newData, setNewData] = useState(data);

  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [stateActions, setStateActions] = useState(emptyActions);
  const [editItem, setEditItem] = useState("");
  const [fetching, setFetching] = useState(false);
  const [errorApi, setErrorApi] = useState("");
  const valueEditItem = useRef("");

  //Menu Categories
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

  //Menu Items
  const [anchorElItem, setAnchorElItem] = useState(null);
  const openMenuItem = Boolean(anchorElItem);
  const dataItem = useRef({});

  //Handlers Menu Categories
  const handlerMenuOpen = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handlerMenuClose = () => {
    setAnchorEl(null);
  };
  const handleEdCategory = (callback) => {
    function updateState(data) {
      setStateActions({
        ...stateActions,
        edit: false,
      });
      setNewData(data);
      setNewCategory(callback.nameCategory);
    }
    if (callback) {
      setFetching(true);
      const options = {
        method: "PUT",
        url: url_base_local + "editcategory",
        headers: { "Content-Type": "application/json" },
        data: {
          name: "Filmes",
          categoryOld: category,
          categoryNew: callback.nameCategory,
          paths: callback.rutas,
        },
      };
      axios
        .request(options)
        .then(function (response) {
          if (response.status === 201) {
            updateState(response.data[callback.nameCategory]);
          }
          setFetching(false);
        })
        .catch(function (error) {
          console.error(error);
          setFetching(false);
        });
    }
  };
  const handleDelCategory = (callback) => {
    if (callback) {
      setFetching(true);
      const options = {
        method: "DELETE",
        url: `${url_base_local}delcategory`,
        headers: { "Content-Type": "application/json" },
        data: { name: "Filmes", category },
      };
      axios
        .request(options)
        .then((response) => {
          if (response.status === 201) {
            setVisible(false);
            setFetching(false);
            setStateActions(emptyActions);
          }
        })
        .catch((err) => {
          setFetching(false);
        });
    }
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
  const handleEdItem = (e, id) => {
    setFetching(true);
    let videos = [];

    newData.videos.forEach((item) => {
      if (item.id === id) {
        videos.push({
          ...item,
          Nombre: valueEditItem.current,
        });
      } else {
        videos.push({ ...item });
      }
    });

    const options = {
      method: "PUT",
      url: `${url_base_local}editfilms`,
      headers: { "Content-Type": "application/json" },
      data: {
        category,
        videos,
      },
    };

    axios
      .request(options)
      .then((response) => {
        if (response.status === 201) {
          const dataVideoActualizados = { ...newData, videos };
          setNewData(dataVideoActualizados);
          setEditItem("");
          valueEditItem.current = "";
          setFetching(false);
        }
      })
      .catch((err) => {
        console.error("Error al editar videos", err);
        setFetching(false);
      });
  };
  const handlePressEnter = (e, id) => {
    if (e.keyCode === 13) handleDelItem(e, id);
  };
  const handleDelItem = (callback) => {
    setFetching(true);
    const videos = newData.videos.filter(
      (item) => item.Nombre !== callback.name
    );

    const options = {
      method: "DELETE",
      url: `${url_base_local}delfilms`,
      headers: { "Content-Type": "application/json" },
      data: {
        category,
        name: callback.name,
      },
    };
    axios
      .request(options)
      .then((response) => {
        if (response.status === 201) {
          setNewData({
            ...newData,
            videos,
          });
          setFetching(false);
          setStateActions(emptyActions);
        }
      })
      .catch((err) => {
        console.error("Error al eliminar:", err);
        setFetching(false);
      });
  };

  //Actions Menu Categories
  const menuAdd = (e, name) => {
    handlerMenuClose();
  };
  const menuEdit = (e, name) => {
    setStateActions({
      edit: true,
      name,
      type: "Categoria",
    });
    handlerMenuClose();
  };
  const menuDel = (e, name) => {
    setStateActions({
      delConfirmation: true,
      name,
      type: "Categoria",
    });
    handlerMenuClose();
  };

  //Actions Menu Items
  const itemEdit = (e) => {
    setEditItem(dataItem.current.name);
    valueEditItem.current = dataItem.current.name;
    handlerMenuCloseItem();
  };
  const itemDel = (e) => {
    setStateActions({
      delConfirmation: true,
      name: dataItem.current.name,
      type: "Filme",
    });
    handlerMenuCloseItem();
  };

  //totales a restar
  const handleTotals = (callback) => {
    totalsSus({
      category: callback.category,
      item: callback.item,
    });
  };

  return visible ? (
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
              {newCategory}
            </Typography>
          </ListItemText>
          <div style={{ marginRight: 40 }}>
            {open ? <ExpandLess /> : <ExpandMore />}
          </div>
        </ListItemButton>

        <IconButton
          id="icon-button"
          onClick={handlerMenuOpen}
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
          {/* <MenuItem onClick={(e) => menuAdd(e, newCategory)}>
            <ListItemIcon>
              <Add />
            </ListItemIcon>
            Agregar
          </MenuItem>

          <Divider /> */}

          <MenuItem onClick={(e) => menuEdit(e, newCategory)}>
            <ListItemIcon>
              <Edit />
            </ListItemIcon>
            Editar
          </MenuItem>

          <MenuItem onClick={(e) => menuDel(e, newCategory)}>
            <ListItemIcon>
              <Delete />
            </ListItemIcon>
            Eliminar
          </MenuItem>
        </Menu>

        <EditModal
          open={stateActions.edit}
          name={stateActions.name}
          type={stateActions.type}
          data={newData}
          fetching={fetching}
          onClose={(callback) => setStateActions(emptyActions)}
          dataCallback={handleEdCategory}
        />
        <DelConfirmation
          open={stateActions.delConfirmation}
          name={stateActions.name}
          type={stateActions.type}
          data={newData}
          fetching={fetching}
          delCategory={handleDelCategory}
          delItem={handleDelItem}
          onClose={(callback) => setStateActions(emptyActions)}
          totalsSus={handleTotals}
        />
      </Box>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {newData.videos.map((item, key) =>
            editItem === item.Nombre ? (
              <ListItem key={key}>
                <IconButton
                  onClick={() => setEditItem("")}
                  style={{ marginLeft: 5, marginRight: 19 }}
                >
                  <Cancel />
                </IconButton>
                <TextField
                  defaultValue={item.Nombre}
                  focused
                  fullWidth
                  onChange={(e) => (valueEditItem.current = e.target.value)}
                  onKeyUp={(e) => handlePressEnter(e, item.id)}
                />
                <IconButton
                  color="primary"
                  onClick={(e) => handleEdItem(e, item.id)}
                >
                  <Save />
                </IconButton>
              </ListItem>
            ) : (
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
            )
          )}

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
  ) : (
    <></>
  );
};

export default ItemControlCategory;
