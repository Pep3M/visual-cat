import { Link } from "react-router-dom";
import AddButton from "../../atoms/AddButton/AddButton";
import "./card.css";
import { useState } from "react";
import { Box } from "@material-ui/core";
import { globalsColors, neumorphismDivItem } from "../../../../styles/GlobalStyles";

const ItemCard = (props) => {
  const [selected, setSelected] = useState(false);
  const { title, img, id, size } = props;
  const sizeFinal = size ?? 150;

  const handleCallback = (childData) => {
    setSelected(childData);
  };

  return (
    <Box
      className="card"
      sx={{
        ...neumorphismDivItem,
        borderRadius: "10px",
        width: `${sizeFinal}px`,
        minWidth: `${sizeFinal}px`,
        height: `${sizeFinal * 1.5}px`,
        minHeight: `${sizeFinal * 1.5}px`,
        margin: 10,
        background: `linear-gradient(130deg, ${globalsColors.lightBaseExtra} 0%, ${globalsColors.lightBaseSecondary} 100%)`,
        overflow: "hidden",
        position: "relative",
        transition: "100ms",
      }}
    >
      <AddButton parentCallback={handleCallback} />
      {/* <Link to={"/movies/" + id}> */}
      <div className="imagen_card">
        {img === "" ? <></> : <img src={"./pelis/imgs/" + img} alt="" />}
      </div>
      {/* </Link> */}
      <div className="footer_card">{title}</div>
    </Box>
  );
};

export default ItemCard;
