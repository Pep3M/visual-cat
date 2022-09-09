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
import { setPeliSelection, deletePeliSelection } from "../../../../actions";

const ItemCard = (props) => {
  const { title, img, id, size, setPeliSelection, deletePeliSelection } = props;
  const sizeFinal = size ?? 150;

  const [selected, setSelected] = useState(false);
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

  const handleCallback = (childData) => {
    console.log(childData);
    setSelected(childData);
    if (childData) {
      setPeliSelection({
        Nombre: title, 
        Imagen: img
      })
    } else {
      console.log(title);
      deletePeliSelection({
        Nombre: title,
      })
    }
  };

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
        background: `linear-gradient(130deg, ${globalsColors.primaryThin} 0%, ${globalsColors.lightBaseThin} 100%)`,
        overflow: "hidden",
        position: "relative",
        transition: "100ms",
      }}
    >
      <AddButton parentCallback={handleCallback} />
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
          backgroundImage: `linear-gradient(180deg, ${globalsColors.primaryThin} 1%, ${globalsColors.primary} 100%)`,
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

const mapDispatchToProps = {
  setPeliSelection,
  deletePeliSelection,
}

export default connect(null, mapDispatchToProps)(ItemCard);
