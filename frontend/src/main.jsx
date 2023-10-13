import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./app/store.js";
import axios from "axios";

axios.defaults.baseURL =
  import.meta.env.VITE_REACT_APP_API_BASE_URL || "http://127.0.0.1:8000";
axios.defaults.withCredentials = true;

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
