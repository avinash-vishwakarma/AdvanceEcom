import React from "react";
import {
  Route,
  RouterProvider,
  createRoutesFromElements,
  createBrowserRouter,
} from "react-router-dom";

// redux

// layouts
import GenralLayout from "./layouts/GenralLayout";
import RootLayout from "./layouts/RootLayout";
// pages

import NotFound from "./pages/errors/NotFound";
// routes
import AuthRoutes from "./Routes/AuthRoutes";
import GenralRoutes from "./Routes/GenralRoutes";
import AdminRoutes from "./Routes/Admin/AdminRoutes";
// loaders
import { useDispatch } from "react-redux";
import { login, logout, setUser } from "./app/stateSlice/authStateSlice";
import axios from "axios";
import UserRoute from "./Routes/UserRoutes";

const App = () => {
  const dispatch = useDispatch();
  const rootPageLoader = () => {
    axios.defaults.baseURL =
      import.meta.env.VITE_REACT_APP_API_BASE_URL || "http://127.0.0.1:8000";
    axios.defaults.withCredentials = true;

    axios.get("/sanctum/csrf-cookie").catch((err) => {
      console.log(err);
    });

    // check id the user is present in the localstorage

    const localUser = JSON.parse(localStorage.getItem("user"));

    if (localUser?.id) {
      return axios
        .get("/api/user")
        .then((response) => {
          dispatch(login(response.data));
          return null;
        })
        .catch((err) => {
          // session expired
          dispatch(logout());
          axios.post("/logout").catch((err) => {
            return null;
          });
        });
    } else if (localUser) {
      dispatch(setUser(localUser));
    }
    return null;
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" loader={rootPageLoader} element={<RootLayout />}>
        {/* Genral Layout */}
        {GenralRoutes}

        {UserRoute}
        {/* auth routes */}
        {AuthRoutes}
        {/* admin Routes */}
        {AdminRoutes}

        {/*  */}
        <Route element={<GenralLayout />}>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
