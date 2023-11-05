import React, { useEffect } from "react";
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
import { login, setUser } from "./app/stateSlice/authStateSlice";
import axios from "axios";
import UserRoute from "./Routes/UserRoutes";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("/sanctum/csrf-cookie")
      .then(() => {
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
              console.log("cant able to login");
            });
        } else if (localUser) {
          dispatch(setUser(localUser));
        }
        return null;
      })
      .catch((err) => {
        console.log(err);
      });

    // check id the user is present in the localstorage
  }, []);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
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
