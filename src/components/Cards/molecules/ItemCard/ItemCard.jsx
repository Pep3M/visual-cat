import { Link } from "react-router-dom";
import AddButton from "../../atoms/AddButton/AddButton";
import "./card.css";
import { Box } from "@material-ui/core";
import {
  globalsColors,
  neumorphismDivItem,
} from "../../../../styles/GlobalStyles";
import { Skeleton } from "@mui/material";
import { useRef, useEffect, useState } from "react";
//use redux
import { connect } from 'react-redux';

const ItemCard = (props) => {
  const { title, img, id, size, pelis } = props;
  const sizeFinal = size ?? 150;

  const isActive = pelis.some(peli => peli.Nombre === title)

  const [showImg, setShowImg] = useState(false);
  const ref = useRef(null);

  
  useEffect(() => {
    const observer = new window.IntersectionObserver((entries) => {
      const { isIntersecting } = entries[0];
      if (isIntersecting) {
        setShowImg(isIntersecting);
      }
    });
    observer.observe(ref.current);
  }, [ref]);

  return (
    <Box
      ref={ref}
      className="card"
      sx={{
        ...neumorphismDivItem,
        borderRadius: "10px",
        width: `${sizeFinal}px`,
        minWidth: `${sizeFinal}px`,
        height: `${sizeFinal * 1.5}px`,
        minHeight: `${sizeFinal * 1.5}px`,
        margin: 10,
        background: `linear-gradient(130deg, ${globalsColors.primaryThin } 0%, ${globalsColors.lightBaseThin} 100%)`,
        overflow: "hidden",
        position: "relative",
        transition: "100ms",
      }}
    >
      <AddButton nombre={title} img={img}/>
      {/* <Link to={"/movies/" + id}> */}
      {showImg ? (
        <div className="imagen_card">
          {img === "" ? (
            <Skeleton
              variant="rectangular"
              animation="wave"
              width={"100%"}
              height={"100%"}
            />
          ) : (
            <img src={"./pelis/imgs/" + img} alt="" />
          )}
        </div>
      ) : (
        <></>
      )}

      {/* </Link> */}
      <div
        style={{
          width: "100%",
          padding: "8px",
          color: "white",
          backgroundImage: `linear-gradient(180deg, ${globalsColors.primaryThin} 1%, ${isActive ? '#45bc8e' : globalsColors.primary} 100%)`,
          backdropFilter: "blur(3px)",
          position: "absolute",
          bottom: 0,
        }}
      >
        {title}
      </div>
    </Box>
  );
};

const mapStoreToProps = (state) => ({
  pelis: state.pelis,
});


export default connect(mapStoreToProps, null)(ItemCard);
