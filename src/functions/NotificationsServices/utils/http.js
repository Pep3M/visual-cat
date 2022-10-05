import axios from "axios";
import { url_base_local } from "../../../api/env";

const host = url_base_local;

async function post(path, body) {
  const options = {
    method: "POST",
    url: `${host}${path}`,
    headers: { "content-type": "application/json" },
    data: body,
  };

  const response = await axios
    .request(options);
  const data = response.json();
  return data;
  /* 
  return fetch(`${host}${path}`, {
    credentials: "omit",
    headers: {
      "content-type": "application/json;charset=UTF-8",
      "sec-fetch-mode": "cors",
    },
    body: JSON.stringify(body),
    method: "POST",
    mode: "cors",
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      return data;
    }); */
}

function get(path) {
  return fetch(`${host}${path}`, {
    credentials: "omit",
    headers: {
      "content-type": "application/json;charset=UTF-8",
      "sec-fetch-mode": "cors",
    },
    method: "GET",
    mode: "cors",
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      return data;
    });
}

const http = {
  post: post,
  get: get,
};

export default http;
