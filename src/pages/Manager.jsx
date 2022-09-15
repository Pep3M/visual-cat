import { Box, createTheme, ThemeProvider } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { url_base } from "../api/env";
import ControlCategory from "../components/ControlCategory/container/ControlCategory";
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
  const update = useRef(false);
  const tipos = Object.keys(allData);

  useEffect(() => {
    axios.get(url_base + "pelis").then((res) =>
      setAllData({
        ...allData,
        Filmes: res.data,
        Series: res.data,
        Novelas: res.data,
        Anime: res.data,
      })
    );
  }, []);

  useEffect(() => {
    if (update) {
      axios.get(url_base + "pelis").then((res) =>
        setAllData({
          ...allData,
          Filmes: res.data,
          Series: res.data,
          Novelas: res.data,
          Anime: res.data,
        })
      );
      update.current = false;
    }
  }, [update.current]);

  const handlerCallbackUpdate = (dataChild) => {
    update.current = dataChild;
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        style={{
          width: "100%",
          minHeight: "100vh",
          backgroundColor: globalsColors.lightBasePrimary,
        }}
      >
        <TopBar />
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
          {tipos.map((tipo, key) => (
            <ControlCategory
              key={key}
              data={allData[tipo]}
              name={tipo}
              callbackUpdate={handlerCallbackUpdate}
            />
          ))}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Manager;
