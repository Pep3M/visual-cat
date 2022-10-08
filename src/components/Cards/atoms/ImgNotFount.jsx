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
          "-webkit-filter": "drop-shadow(0px 5px 15px RGB(43,129,214,0.5))",
          filter: "drop-shadow(0px 5px 15px RGB(43,129,214,0.5))",
        }}
        src={process.env.PUBLIC_URL + "/logo192.png"}
        alt="Imagen no encontrada"
      />
      {/* <img
        style={{
          objectFit: "contain",
          opacity: 0.5,
          position: 'absolute',
          filter: "blur(20px)",
          scale: 'calc(100% * 1.2)'
        }}
        src={process.env.PUBLIC_URL + "/logo192.png"}
        alt="Imagen no encontrada"
      /> */}
    </div>
  );
};

export default ImgNotFount;
