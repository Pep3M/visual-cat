import { HdOutlined } from "@mui/icons-material";
import React from "react";

const HdIndicator = () => {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        padding: "8px",
        zIndex: 100,
      }}
    >
      <HdOutlined color="primary"/>
    </div>
  );
};

export default HdIndicator;
