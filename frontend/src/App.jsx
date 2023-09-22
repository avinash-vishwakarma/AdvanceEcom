import React, { useEffect } from "react";
import {
  Route,
  RouterProvider,
  createRoutesFromElements,
  createBrowserRouter,
} from "react-router-dom";
import axios from "axios";

// redux
import { useDispatch, useSelector } from "react-redux";

// layouts
import GenralLayout from "./layouts/GenralLayout";
import RootLayout from "./layouts/RootLayout";
// pages
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Protected from "./components/Protected";
import Logout from "./pages/auth/Logout";
import { login, logout, setUser } from "./app/stateSlice/authStateSlice";
import VerifyEmail from "./pages/auth/VerifyEmail";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import NotFound from "./pages/errors/NotFound";

const App = () => {
  const dispatch = useDispatch();

  const rootPageLoader = () => {
    axios.defaults.baseURL =
      import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";
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
        });
    } else if (localUser) {
      dispatch(setUser(localUser));
    }
    return null;
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" loader={rootPageLoader} element={<RootLayout />}>
        <Route element={<GenralLayout />}>
          <Route index element={<Home />} />
        </Route>
        <Route element={<Protected guest />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/password-reset/:token" element={<ResetPassword />} />
        </Route>

        <Route element={<Protected auth />}>
          <Route path="/logout" element={<Logout />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
        </Route>

        <Route element={<GenralLayout />}>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
