import React from "react";
import { Route } from "react-router-dom";
import Protected from "../components/Protected";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";
import Logout from "../pages/auth/Logout";
import VerifyEmail from "../pages/auth/VerifyEmail";
import GenralLayout from "../layouts/GenralLayout";
import UserProfile from "../pages/User/UserProfile";

const AuthRoutes = (
  <Route>
    {/* Layout : null  , Protected : guest*/}
    <Route element={<Protected guest />}>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/password-reset/:token" element={<ResetPassword />} />
    </Route>

    {/* Layout : null , protected : auth */}
    <Route element={<Protected redirect="/login" auth />}>
      <Route path="/logout" element={<Logout />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      {/* auth | GenralLayout */}
      <Route element={<GenralLayout />}>
        <Route path="/user-profile" element={<UserProfile />} />
      </Route>
    </Route>
  </Route>
);

export default AuthRoutes;
