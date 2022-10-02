import { Box, Typography } from "@material-ui/core";
import React, { useState } from "react";
import {
  globalsColors,
  neumorphismDivContainer,
} from "../../../styles/GlobalStyles";
import ShowMore from "../atoms/ShowMore/ShowMore";
import ItemCard from "../molecules/ItemCard/ItemCard";

const CardContainer = (props) => {
  const { header, video } = props;
  const [showMore, setShowMore] = useState(false);

  return (
    <Box
      sx={{
        ...neumorphismDivContainer,
        margin: 20,
        mb: 0,
        padding: 10,
      }}
    >
      <Typography
        variant="h4"
        style={{
          width: "100%",
          textAlign: "center",
          marginBlock: 30,
          color: globalsColors.primary,
        }}
      >
        {header}
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {
          !showMore ? (
            video.videos.slice(0,6).map((item, key) => (
              <ItemCard key={key} title={item.Nombre} data={item} img={item.Imagen} />
            ))
          ) : (
            video.videos.map((item, key) => (
              <ItemCard key={key} title={item.Nombre} data={item} img={item.Imagen} />
            ))
          )
        }
      </Box>
      <ShowMore cantidad={video.videos.length} callbackShow={(e) => setShowMore(e)} />
    </Box>
  );
};

export default CardContainer;
