import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../app/stateSlice/authStateSlice";
import { Navigate, useNavigate } from "react-router-dom";
import { setToaster } from "../../app/stateSlice/toasterAlertStateSlice";

const Logout = () => {
  // send the logout request

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("loggin out user");
    axios
      .post("/logout")
      .then(() => {
        dispatch(logout());
        console.log("loggin user out");
        dispatch(
          setToaster({
            title: "Logout Successfully",
            body: "User Loged Out Successfully",
            type: "success",
          })
        );
        navigate("/", {
          replace: true,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
};

export default Logout;
