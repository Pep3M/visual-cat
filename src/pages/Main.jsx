import { Box } from "@material-ui/core";
import React from "react";
import CardContainer from "../components/Cards/container/CardContainer";
import TopBar from "../components/TopBar/TopBar";

const Main = () => {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#fff",
      }}
    >
      <TopBar />
      <CardContainer />
    </Box>
  );
};

export default Main;
