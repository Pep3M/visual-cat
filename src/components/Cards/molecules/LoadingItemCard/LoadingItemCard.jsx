import "../ItemCard/card.css";
import {
  globalsColors,
  neumorphismDivItem,
} from "../../../../styles/GlobalStyles";
import { useMediaQuery, useTheme } from "@material-ui/core";

const LoadingItemCard = () => {
  const theme = useTheme();
  const bpSuperior = useMediaQuery(theme.breakpoints.down(417));
  const bpMedio = useMediaQuery(theme.breakpoints.down(360));
  const size = bpMedio ? 160 : bpSuperior ? 120 : 150;

  return (
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
    </div>
  );
};

export default LoadingItemCard;
