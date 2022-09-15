import {
  Avatar,
  Box,
  List,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@material-ui/core";
import { Folder } from "@mui/icons-material";
import { ListItemButton } from "@mui/material";
import React from "react";
import {
  globalsColors,
  neumorphismDivContainer,
} from "../../../styles/GlobalStyles";
import ItemControlCategory from "../molecules/ItemControlCategory";

const ControlCategory = (props) => {
  const { data, name } = props;
  const categories = Object.keys(data);

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
          backgroundColor: 'RGB(243,248,252,0.85)',
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
            height: "50px",
            textAlign: "center",
            marginBlock: 20,
          }}
        >
          {name}
        </Typography>
      </Box>
      <Box
        sx={{
          paddingTop: "80px",
          height: "calc(100% - 80px)",
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
    </Box>
  );
};

export default ControlCategory;
