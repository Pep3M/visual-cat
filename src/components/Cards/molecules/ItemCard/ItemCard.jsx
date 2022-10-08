import { Link } from "react-router-dom";
import AddButton from "../../atoms/AddButton/AddButton";
import "./card.css";
import { Box, useMediaQuery, useTheme } from "@material-ui/core";
import {
  globalsColors,
  neumorphismDivItem,
} from "../../../../styles/GlobalStyles";
import { Skeleton } from "@mui/material";
import { useRef, useEffect, useState } from "react";
//use redux
import { connect } from "react-redux";
import axios from "axios";
import { url_base } from "../../../../api/env";
import HdIndicator from "../../atoms/HdIndicator";
import ImgNotFount from "../../atoms/ImgNotFount";

const ItemCard = (props) => {
  const { title, img, id, primarySize = 150, data, pelis } = props;

  const isActive = pelis.some((peli) => peli.Nombre === title);

  const [showImg, setShowImg] = useState(false);
  const ref = useRef(null);

  const theme = useTheme();
  const bpSuperior = useMediaQuery(theme.breakpoints.down(417));
  const bpMedio = useMediaQuery(theme.breakpoints.down(360));

  const size = bpMedio ? 160 : bpSuperior ? 120 : primarySize;

  /* const [urlImg, setUrlImg] = useState('');
  
  useEffect(() => {
    axios.get(url_base + 'pelisImg')
    .then(res => setUrlImg(res.data))
  }, []); */

  useEffect(() => {
    const observer = new window.IntersectionObserver((entries) => {
      const { isIntersecting } = entries[0];
      setShowImg(isIntersecting);
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
        width: `${size}px`,
        minWidth: `${size}px`,
        height: `${size * 1.5}px`,
        minHeight: `${size * 1.5}px`,
        margin: 10,
        background: `linear-gradient(130deg, ${globalsColors.primaryThin} 0%, ${globalsColors.lightBaseThin} 100%)`,
        overflow: "hidden",
        position: "relative",
        transition: "100ms",
      }}
    >
      {data.Size < 2500 ? <></> : <HdIndicator />}
      <AddButton nombre={title} img={img} data={data} />
      {/* <Link to={"/movies/" + id}> */}
      {showImg ? (
        <div className="imagen_card">
          {img === "" ? (
            <>
              <ImgNotFount />
            </>
          ) : (
            <img src={url_base + "pelisImg/" + img} alt="" />
          )}
        </div>
      ) : (
        <>
          <Skeleton
            variant="rectangular"
            animation="wave"
            width={"100%"}
            height={"100%"}
          />
        </>
      )}

      {/* </Link> */}
      <div
        style={{
          width: "100%",
          padding: "8px",
          color: "white",
          backgroundImage: `linear-gradient(180deg, ${
            globalsColors.primaryThin
          } 1%, ${isActive ? "#45bc8e" : globalsColors.primary} 100%)`,
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
