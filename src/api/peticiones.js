import { url_base } from "./env";

const options = {
  method: "GET",
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
};

export const pelisList = () =>
  fetch(url_base, options)
    .then((response) => response.json())
    .catch((err) => err);
