import { Box } from "@material-ui/core";
import React from "react";
import CardContainer from "../components/Cards/container/CardContainer";
import TopBar from "../components/TopBar/TopBar";
import pelisData from '../pelis.json'
import { globalsColors } from "../styles/GlobalStyles";
//redux
import { connect } from 'react-redux';
import FabCustom from "../components/FabCustom/FabCustom";

const Main = (props) => {
  const claves = Object.keys(pelisData);
  console.log(props.pelis);
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
        paddingBottom: 20,
      }}>
        {claves.map((item, key) => (
          <CardContainer key={key} header={item} video={pelisData[item]} />
        ))}
        <FabCustom />
      </Box>
    </Box>
  );
};

const mapStateToProps = state => ({
  pelis: state.pelis,
})

export default connect(mapStateToProps, null)(Main);
