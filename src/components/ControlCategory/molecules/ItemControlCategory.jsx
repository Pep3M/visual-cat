import React, { useState } from "react";
import { ListItemButton } from "@mui/material";
import {
  Avatar,
  Collapse,
  List,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@material-ui/core";
import { ExpandLess, ExpandMore, Folder, Movie } from "@mui/icons-material";

const ItemControlCategory = (props) => {
  const { category, data } = props;

  const [open, setOpen] = useState(false);

  return (
    <>
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
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {data.map((item, key) => (
            <ListItemButton key={key} sx={{ pl: 4 }}>
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
        </List>
      </Collapse>
    </>
  );
};

export default ItemControlCategory;
