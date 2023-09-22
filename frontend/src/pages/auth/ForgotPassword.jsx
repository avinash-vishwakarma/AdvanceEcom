import React, { useDebugValue, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useSendRequest from "../../hooks/useSendRequest";
import Button from "../../components/ui/Genral/Button";
import { useDispatch } from "react-redux";
import { setUser } from "../../app/stateSlice/authStateSlice";
import EmailInput from "../../components/ui/Form/EmailInput";
import Alert from "../../components/ui/Form/Alert";
const ForgotPassword = () => {
  const [request, isLoading, response, error] = useSendRequest();
  const [isEmailSent, setEmailSent] = useState(false);
  const dispatch = useDispatch();

  const resetPasswordSubmitHandler = (e) => {
    e.preventDefault();
    const restformData = new FormData(e.target);
    dispatch(
      setUser({
        email: restformData.get("email"),
      })
    );
    request({
      url: "/forgot-password",
      data: restformData,
      method: "post",
      headers: {
        "Content-type": "multipart/formdata",
      },
    });
  };

  useEffect(() => {
    console.log("forgot password response", response);
    if (response) {
      setEmailSent(true);
    }
  }, [response]);

  return (
    <>
      <div className="login-back-button">
        <Link to={-1}>
          <i className="bi bi-arrow-left-short"></i>
        </Link>
      </div>

      {/* <!-- Login Wrapper Area --> */}
      <div className="login-wrapper d-flex align-items-center justify-content-center">
        <div className="custom-container">
          <div className="text-center px-4">
            <img className="login-intro-img" src="img/bg-img/37.png" alt="" />
          </div>

          {/* <!-- Register Form --> */}
          {!isEmailSent && (
            <>
              <Alert error={error} />

              <div className="register-form mt-4">
                <form onSubmit={resetPasswordSubmitHandler}>
                  <div className="form-group text-start mb-3">
                    <EmailInput
                      name="email"
                      placeholder="Enter Registered Email"
                    />
                  </div>
                  <Button isLoading={isLoading} type="submit">
                    Reset Password
                  </Button>
                </form>
              </div>
            </>
          )}

          {isEmailSent && (
            <>
              <p>Kindly check your email for rest password link</p>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
