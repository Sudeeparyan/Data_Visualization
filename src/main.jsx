import React from "react";
import ReactDOM from "react-dom/client";

import { Provider } from "react-redux";
import "./Styles/style.css";
import { store } from "./Redux/store.jsx";
import App from "./Components/Pages/App/app";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
