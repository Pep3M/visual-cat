import { Box } from "@material-ui/core";
import React from "react";
import CardContainer from "../components/Cards/container/CardContainer";
import TopBar from "../components/TopBar/TopBar";
import pelisData from '../pelis.json'
import { globalsColors } from "../styles/GlobalStyles";

const Main = () => {
  const claves = Object.keys(pelisData);
  
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: globalsColors.lightBasePrimary,
      }}
    >
      <TopBar />
      <Box sx={{
      }}>
        {claves.map((item, key) => (
          <CardContainer key={key} header={item} video={pelisData[item]} />
        ))}
      </Box>
    </Box>
  );
};

export default Main;
