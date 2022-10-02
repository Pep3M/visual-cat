import { Save } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, Typography, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { url_base_local } from "../../../api/env";
import { neumorphismDivContainer } from "../../../styles/GlobalStyles";
import CustomSnackBarr from "../atoms/CustomSnackBarr";

const GeneralsConf = () => {
  const [state, setState] = useState({
    price: "",
    priceHD: "",
    fetching: false,
  });

  //handlers
  const handleChangePrice = (e) => {
    setState({
      ...state,
      price: e.target.value,
    });
  };
  const handleChangePriceHD = (e) => {
    setState({
      ...state,
      priceHD: e.target.value,
    });
  };
  const handleSaveConf = (e) => {
    setState({
      ...state,
      fetching: true,
    });

    const options = {
      method: "PUT",
      url: url_base_local + "setconfig",
      data: {
        price: state.price,
        priceHD: state.priceHD,
      },
    };
    axios
      .request(options)
      .then((response) => {
        if (response.status === 201) {
          setState({
            ...state,
            fetching: false,
          });

          return (
            <CustomSnackBarr
              message={"Configuracion guardada"}
              severity={"success"}
              duration={3000}
            />
          );
        }
        setState({
          ...state,
          fetching: false,
        });
      })
      .catch((err) => {
        setState({
          ...state,
          fetching: false,
        });
        console.error("Error al hacer peticion al servidor:", err);

        return (
          <CustomSnackBarr
            message={"No se pudo guardar, revise los datos o el servidor"}
            severity={"error"}
            duration={4000}
          />
        );
      });
  };

  useEffect(() => {
    axios.get(url_base_local + "getconfig").then((response) => {
      if (response.status === 201) {
        setState({
          ...state,
          price: response.data.price,
          priceHD: response.data.priceHD,
          fetching: false,
        });
      }
    });
  }, []);

  return (
    <Box
      sx={{
        ...neumorphismDivContainer,
        margin: 2.5,
        mb: 0,
        height: "fit-content",
        padding: 3,
        width: "100%",

        maxWidth: 374,
        minWidth: 250,
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Typography
        variant="h4"
        color="primary"
        style={{
          width: "100%",
          textAlign: "center",
          marginBlock: 20,
          marginBottom: 10,
        }}
      >
        Configuraciones
      </Typography>

      <Box sx={{ marginTop: 3, display: "flex" }}>
        <TextField
          label="Precio filmes"
          value={state.price}
          onChange={handleChangePrice}
          sx={{
            marginInlineEnd: 2,
          }}
        />
        <TextField
          label="Precio filmes HD"
          value={state.priceHD}
          onChange={handleChangePriceHD}
        />
      </Box>
      <Box
        sx={{
          marginTop: 3,
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <LoadingButton
          variant="contained"
          color="primary"
          loading={state.fetching}
          loadingPosition="start"
          startIcon={<Save />}
          onClick={handleSaveConf}
        >
          Guardar
        </LoadingButton>
      </Box>
    </Box>
  );
};

export default GeneralsConf;
