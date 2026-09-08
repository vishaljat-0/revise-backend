import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./app/App.jsx";
import "./app/index.css";
import store from "./app/store.js";
import { configureStore } from "@reduxjs/toolkit";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>

  <BrowserRouter>
    <App />
  </BrowserRouter>
  </Provider>
);
