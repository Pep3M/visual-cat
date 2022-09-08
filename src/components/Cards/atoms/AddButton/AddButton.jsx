import "./addButon.css";
import React from "react";
import { useState } from "react";

const AddButton = (props) => {
  const { parentCallback } = props;
  const [clicked, setClicked] = useState(false);
  const [nombreClase, setNombreClase] = useState("sf-btn add");

  const handleClicked = (e) => {
    if (clicked) {
      setNombreClase("sf-btn add");
      parentCallback(false);
    } else {
      setNombreClase("sf-btn added");
      parentCallback(true);
    }
    setClicked(!clicked);
  };

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        padding: "5px",
        cursor: "pointer",
        borderRadius: "50%",
        outlineWidth: 0,
      }}
    >
      <button type="submit" className={nombreClase} onClick={handleClicked}>
        <div class="icn-sf">
          <span class="line line-1"></span>
          <span class="line line-2"></span>
        </div>
        <div class="loader"></div>
      </button>
    </div>
  );
};

export default AddButton;
