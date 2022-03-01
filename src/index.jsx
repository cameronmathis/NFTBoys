import { StylesProvider } from "@material-ui/core/styles";
import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

import "./css/index.css";

ReactDOM.render(
  <StylesProvider injectFirst>
    <App />
  </StylesProvider>,
  document.getElementById("root")
);
