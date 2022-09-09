import { Box, Typography } from "@material-ui/core";
import React from "react";
import { globalsColors, neumorphismDivContainer } from "../../../styles/GlobalStyles";
import ItemCard from "../molecules/ItemCard/ItemCard";

const CardContainer = (props) => {
  const { header, video } = props;
  return (
    <Box
      sx={{
        ...neumorphismDivContainer,
        margin: 20,
        padding: 10,
      }}
    >
      <Typography variant="h4" style={{
        width: '100%',
        textAlign: 'center',
        marginBlock: 30,
        color: globalsColors.primary,
      }} >
        {header}
      </Typography>

      <Box sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
      }}>
        {video.map((item, key) => (
          <ItemCard key={key} title={item.Nombre} img={item.Imagen}/>
        ))}
      </Box>
    </Box>
  );
};

export default CardContainer;
