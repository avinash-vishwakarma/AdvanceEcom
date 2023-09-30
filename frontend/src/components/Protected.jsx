import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import hasRole from "../Helper/hasRole";

import NotFound from "../pages/errors/NotFound";

const Protected = (props) => {
  let isValid = false;

  const auth = useSelector((store) => store.auth);

  if (props.guest) {
    // valid only when the user is not logedin
    isValid = !auth.isLogin;
  }

  if (props.auth) {
    isValid = auth.isLogin;
  }

  if (props.admin) {
    // get the global sate
    isValid = hasRole(auth.user?.roles, "Admin");
  }

  if (isValid) {
    return <Outlet />;
  }

  return props.redirect ? (
    <Navigate to={props.redirect} replace={true} />
  ) : (
    <NotFound />
  );
};

export default Protected;
