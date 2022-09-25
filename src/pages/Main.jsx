import {
  Box,
  createTheme,
  LinearProgress,
  ThemeProvider,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import CardContainer from "../components/Cards/container/CardContainer";
import TopBar from "../components/TopBar/TopBar";
/* import { pelisList } from "../api/peticiones"; */
import { globalsColors } from "../styles/GlobalStyles";
//redux
import { connect } from "react-redux";
import FabCustom from "../components/FabCustom/FabCustom";
import axios from "axios";
import { url_base, url_base_local } from "../api/env";

const theme = createTheme({
  palette: {
    primary: {
      main: globalsColors.primary,
    },
    secondary: {
      main: globalsColors.redPrimary,
    },
  },
  components: {},
});

const Main = (props) => {
  const [pelisApi, setPelisApi] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [showManager, setShowManager] = useState(false);

  useEffect(() => {
    axios.get(`${url_base}pelis`).then((res) => {
      setPelisApi(res.data);
      setLoaded(true);
    });
    axios.get(url_base_local).then((res) => {
      if (res.status === 200) {
        setShowManager(true);
      }
    });
  }, []);

  const claves = Object.keys(pelisApi);
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          width: "100%",
          minHeight: "100vh",
          backgroundColor: globalsColors.lightBasePrimary,
        }}
      >
        <TopBar showManager={showManager} />

        {!loaded ? (
          <LinearProgress color="primary" />
        ) : (
          <Box
            sx={{
              paddingBottom: 20,
            }}
          >
            {claves.map((item, key) => (
              <CardContainer key={key} header={item} video={pelisApi[item]} />
            ))}
            <FabCustom />
          </Box>
        )}
      </Box>
    </ThemeProvider>
  );
};

const mapStateToProps = (state) => ({
  pelis: state.pelis,
});

export default connect(mapStateToProps, null)(Main);
