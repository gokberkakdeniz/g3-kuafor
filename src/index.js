import "./index.css";

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import Routes from "./pages/Routes";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App>
        <Routes />
      </App>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
