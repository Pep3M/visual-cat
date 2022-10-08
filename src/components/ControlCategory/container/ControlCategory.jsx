import {
  Box,
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@material-ui/core";
import { CreateNewFolderOutlined } from "@mui/icons-material";
import React, { useState } from "react";
import {
  globalsColors,
  neumorphismDivContainer,
  scrollBarStyle,
} from "../../../styles/GlobalStyles";
import ModalAddCategory from "../../ModalAddCategory/ModalAddCategory";
import CustomSnackBarr from "../atoms/CustomSnackBarr";
import ItemControlCategory from "../molecules/ItemControlCategory";

const ControlCategory = (props) => {
  const { data, name } = props;
  const [dataState, setDataState] = useState(data);
  const categories = Object.keys(dataState);

  const [openAddCategory, setOpenAddCategory] = useState(false);

  const totalData = () => {
    var counter = 0;
    categories.map(
      (category) => (counter = counter + dataState[category].videos.length)
    );
    return counter;
  };

  const [totals, setTotals] = useState({
    category: categories.length,
    item: totalData(),
  });

  const handlerCallback = (dataChild) => {
    setOpenAddCategory(dataChild);
  };
  const handlerUpdateData = (dataChild) => {
    setDataState({
      ...dataState,
      [dataChild.name]: dataChild.data,
    });
  };
  const handlerTotals = (callback) => {
    console.log("callback", callback);
    console.log("totals", totals);
    setTotals({
      category: totals.category - callback.category,
      item: totals.item - callback.item,
    });
  };

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
            <ListItem
              style={{
                justifyContent: "center",
              }}
            >
              <ListItemText
                primary={
                  totals.category > 1
                    ? `${totals.category} categorias`
                    : `1 categoria`
                }
                secondary={`${totals.item} ${name.toLowerCase()}`}
                style={{
                  display: totals.item === 0 ? "none" : "",
                  marginLeft: 10,
                }}
              />
              <ListItemIcon>
                <Button
                  variant="outlined"
                  startIcon={<CreateNewFolderOutlined />}
                  onClick={() => setOpenAddCategory(true)}
                >
                  Nueva categoria
                </Button>
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
              data={dataState[category]}
              totalsSus={handlerTotals}
            />
          ))}
        </List>
      </Box>
      <ModalAddCategory
        name={name}
        open={openAddCategory}
        closeCallback={handlerCallback}
        updateData={handlerUpdateData}
      />
    </Box>
  );
};

export default ControlCategory;
