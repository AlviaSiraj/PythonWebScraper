import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import store from "./redux/store";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css?family=Lobster"
></link>;

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
