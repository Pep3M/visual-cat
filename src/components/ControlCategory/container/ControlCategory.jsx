import {
  Avatar,
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@material-ui/core";
import { CreateNewFolderOutlined, Folder } from "@mui/icons-material";
import { ListItemButton } from "@mui/material";
import React, { useState } from "react";
import {
  globalsColors,
  neumorphismDivContainer,
  scrollBarStyle,
} from "../../../styles/GlobalStyles";
import ModalAddCategory from "../../ModalAddCategory/ModalAddCategory";
import ItemControlCategory from "../molecules/ItemControlCategory";

const ControlCategory = (props) => {
  const { data, name, callbackUpdate } = props;
  const categories = Object.keys(data);

  const [openAddCategory, setOpenAddCategory] = useState(false);

  const totalData = () => {
    var counter = 0;
    categories.map(
      (category) => (counter = counter + data[category].length)
    );
    return counter;
  };

  const handlerCallback = dataChild => {
    setOpenAddCategory(dataChild)
    callbackUpdate(dataChild)
  }

  callbackUpdate(false)

  return (
    <Box
      sx={{
        ...neumorphismDivContainer,
        margin: 20,
        mb: 0,
        padding: 10,
        width: "100%",
        height: "80vh",
        maxWidth: 400,
        minWidth: 250,
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Box
        style={{
          backgroundColor: "RGB(243,248,252,0.85)",
          position: "fixed",
          zIndex: 10,
          top: 0,
          left: 0,
          width: "100%",
          backdropFilter: "blur(20px)",
          boxShadow:
            "0px 2px 4px -1px RGB(0,0,0,0.1), 0px 4px 5px 0px RGB(255,255,255,0.2)",
        }}
      >
        <Typography
          variant="h4"
          color="primary"
          style={{
            width: "100%",
            textAlign: "center",
            marginBlock: 20,
            marginBottom: 10,
          }}
        >
          {name}
        </Typography>
        <Divider style={{ marginInline: 10 }} />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            width: "100%",
          }}
        >
          <List style={{ width: "100%", paddingBlock: 0 }}>
            <ListItem>
              <ListItemText
                primary={
                  categories.length > 1
                    ? `${categories.length} categorias`
                    : `1 categoria`
                }
                secondary={`${totalData()} ${name.toLowerCase()}`}
                style={{ marginLeft: 10 }}
              />
              <ListItemIcon>
                <IconButton onClick={() => setOpenAddCategory(true)}>
                  <CreateNewFolderOutlined />
                </IconButton>
              </ListItemIcon>
            </ListItem>
          </List>
        </Box>
      </Box>
      <Box
        style={{
          ...scrollBarStyle,
          paddingTop: "130px",
          height: "calc(100% - 130px)",
          overflow: "auto",
          paddingBottom: 10,
        }}
      >
        <List
          sx={{
            width: "100%",
            bgcolor: globalsColors.lightBasePrimary,
            color: "primary",
          }}
        >
          {categories.map((category, key) => (
            <ItemControlCategory
              key={key}
              category={category}
              data={data[category]}
            />
          ))}
        </List>
      </Box>
      <ModalAddCategory name={name} open={openAddCategory} closeCallback={handlerCallback}/>
    </Box>
  );
};

export default ControlCategory;
