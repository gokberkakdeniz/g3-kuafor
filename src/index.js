import "./index.css";

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App";
import Routes from "./pages/Routes";
import { store } from "./store";
// import weekOfYear from "dayjs/plugin/weekOfYear";
// import dayjs from "dayjs";
// import "dayjs/locale/tr";

// dayjs.extend(weekOfYear);
// dayjs.locale("tr");

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App>
          <Routes />
        </App>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
