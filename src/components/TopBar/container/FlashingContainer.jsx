import * as React from "react";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { globalsColors } from "../../../styles/GlobalStyles";
import axios from "axios";
import { url_base_local } from "../../../api/env";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    //backgroundColor: globalsColors.primary,
    color: globalsColors.primary,
    "&::after": {
      position: "absolute",
      top: -1,
      left: -1,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(0.8)",
      opacity: 0,
    },
    "10%": {
      opacity: 1,
    },
    "100%": {
      transform: "scale(3.4)",
      opacity: 0,
    },
  },
}));

export default function FlashingContainer() {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    axios.get(url_base_local + "pelis").then((result) => {
      if (result.status === 201) {
        const dataCount = Object.keys(result.data).length;
        setCount(dataCount);
      }
    });
  }, []);

  return (
    <StyledBadge
      overlap="circular"
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      variant="dot"
      style={{
        display: count === 0 ? "" : "none",
        position: "absolute",
      }}
    ></StyledBadge>
  );
}
