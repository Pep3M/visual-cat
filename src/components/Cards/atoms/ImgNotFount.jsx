import React from "react";

const ImgNotFount = () => {
  return (
    <div
      style={{
        marginInline: 30,
        position: "relative",
      }}
    >
      <img
        style={{
          position: "absolute",
          objectFit: "contain",
          zIndex: 2,
          WebkitFilter: "drop-shadow(0px 5px 15px RGB(43,129,214,0.5))",
          filter: "drop-shadow(0px 5px 15px RGB(43,129,214,0.5))",
        }}
        src={process.env.PUBLIC_URL + "/logo192.png"}
        alt="Imagen no encontrada"
      />
    </div>
  );
};

export default ImgNotFount;
