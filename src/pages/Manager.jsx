import { Box, createTheme, ThemeProvider } from "@material-ui/core";
import { LinearProgress } from "@mui/material";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { url_base, url_base_local } from "../api/env";
import ControlCategory from "../components/ControlCategory/container/ControlCategory";
import GeneralsConf from "../components/ControlCategory/container/GeneralsConf";
import TopBar from "../components/TopBar/TopBar";
import { globalsColors } from "../styles/GlobalStyles";

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

const Manager = () => {
  const [allData, setAllData] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const tipos = Object.keys(allData);

  useEffect(() => {
    axios.get(url_base + "pelis").then((res) => {
      setAllData({
        ...allData,
        Filmes: res.data,
      });
      setLoaded(true);
    });

    axios.get(url_base_local).then((res) => {
      if (res.status === 200) {
        setShowNotifications(true);
      }
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Box
        style={{
          width: "100%",
          minHeight: "100vh",
          backgroundColor: globalsColors.lightBasePrimary,
        }}
      >
        <TopBar showNotifications={showNotifications} />
        {!loaded ? (
          <LinearProgress color="primary" />
        ) : (
          <Box
            className="body_manager"
            style={{
              width: "100%",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              paddingBottom: 20,
            }}
          >
            <GeneralsConf />

            {tipos.map((tipo, key) => (
              <ControlCategory key={key} data={allData[tipo]} name={tipo} />
            ))}
          </Box>
        )}
      </Box>
    </ThemeProvider>
  );
};

export default Manager;
