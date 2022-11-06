import AddButton from "../../atoms/AddButton/AddButton";
import "./card.css";
import { useMediaQuery, useTheme } from "@material-ui/core";
import {
  globalsColors,
  neumorphismDivItem,
} from "../../../../styles/GlobalStyles";
import { useRef, useEffect, useState } from "react";
//use redux
import { connect } from "react-redux";
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

  useEffect(() => {
    const observer = new window.IntersectionObserver((entries) => {
      const { isIntersecting } = entries[0];
      if (isIntersecting) setShowImg(true);
    });
    observer.observe(ref.current);
  }, [ref]);

  return (
    <div ref={ref}>
      {showImg ? (
        <div
          className="card"
          style={{
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
            <></>
          )}

          {/* </Link> */}
          <div
            style={{
              width: "calc(100% - 16px)",
              padding: "8px",
              color: "white",
              backgroundImage: `linear-gradient(180deg, ${
                globalsColors.primaryStrong
              } 1%, ${isActive ? "#45bc8e" : globalsColors.primary} 100%)`,
              /* backdropFilter: "blur(3px)", */
              position: "absolute",
              bottom: 0,
              zIndex: 3,
            }}
          >
            {title}
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

const mapStoreToProps = (state) => ({
  pelis: state.pelis,
});

export default connect(mapStoreToProps, null)(ItemCard);
