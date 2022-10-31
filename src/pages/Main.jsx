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
import ModalOrderSended from "../components/ModalCart/ModalOrderSended";
import WithoutFilms from "../components/Guide/WithoutFilms";

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
  const [timeoutServer, setTimeoutServer] = useState(false);

  console.log("openMain", loaded);

  useEffect(() => {
    axios.get(`${url_base}pelis`).then((res) => {
      setPelisApi(res.data);
      console.log("get");
    });
    axios
      .get(url_base_local)
      .then((res) => {
        if (res.status === 200) {
          setShowManager(true);
          setTimeoutServer(false);
          console.log("then 200");
        }
        setLoaded(true);
        console.log("then other status");
      })
      .catch((err) => {
        setLoaded(true);
        setTimeoutServer(true);
        console.log("ERROR CATCH", err);
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
        <TopBar showNotifications={showManager} showManager={showManager} />

        {!loaded ? (
          <LinearProgress color="primary" />
        ) : (
          <Box
            sx={{
              paddingBottom: 20,
            }}
          >
            {claves.length > 0 ? (
              claves.map((item, key) => (
                <CardContainer key={key} header={item} video={pelisApi[item]} />
              ))
            ) : (
              <WithoutFilms manager={showManager} timeout={false} />
            )}
            <FabCustom />
          </Box>
        )}
        <ModalOrderSended />
      </Box>
    </ThemeProvider>
  );
};

const mapStateToProps = (state) => ({
  pelis: state.pelis,
  state,
});
export default connect(mapStateToProps, null)(Main);
