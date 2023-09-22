import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import EmailInput from "../../components/ui/Form/EmailInput";
import PasswordInput from "../../components/ui/Form/PasswordInput";
import useSendRequest from "../../hooks/useSendRequest";
import Button from "../../components/ui/Genral/Button";
import { useDispatch } from "react-redux";
import { login } from "../../app/stateSlice/authStateSlice";
import { setToaster } from "../../app/stateSlice/toasterAlertStateSlice";
import Alert from "../../components/ui/Form/Alert";

const Login = () => {
  const dispatch = useDispatch();
  const [request, isLoading, response, error] = useSendRequest();
  const navigate = useNavigate();
  const loginSubmitHandler = (e) => {
    e.preventDefault();

    const LoginFormData = new FormData(e.target);

    request({
      url: "/login",
      method: "post",
      data: LoginFormData,
      headers: {
        "Content-Type": "multipart/formdata",
      },
    });
  };

  useEffect(() => {
    if (response !== null) {
      dispatch(login(response.data));
      dispatch(
        setToaster({
          title: "Login Successful",
          body: `welcome back ${response.data.name}`,
          type: "success",
        })
      );
      navigate("/", {
        replace: true,
      });
    }
  }, [response]);

  return (
    <React.Fragment>
      {/*  Back Button  */}
      <div className="login-back-button">
        <Link to={-1}>
          <i className="bi bi-arrow-left-short"></i>
        </Link>
      </div>

      <div className="login-wrapper d-flex align-items-center justify-content-center">
        <div className="custom-container">
          <div className="text-center px-4">
            <img className="login-intro-img" src="img/bg-img/36.png" alt="" />
          </div>

          {/*  Register Form  */}
          <div className="register-form mt-4">
            <h6 className="mb-3 text-center">
              Log in to continue to the Affan
            </h6>

            <Alert error={error} />

            <form onSubmit={loginSubmitHandler}>
              <EmailInput name={"email"} />
              <PasswordInput name={"password"} />

              <div className="form-check mb-3">
                <input
                  name="remember"
                  className="form-check-input"
                  id="checkedCheckbox"
                  type="checkbox"
                  value=""
                  checked
                />
                <label
                  className="form-check-label text-muted fw-normal"
                  htmlFor="checkedCheckbox"
                >
                  Remember Me.
                </label>
              </div>

              <Button isLoading={isLoading} type="submit">
                Login
              </Button>
            </form>
          </div>

          {/*  Login Meta  */}
          <div className="login-meta-data text-center">
            <Link
              className="stretched-link forgot-password d-block mt-3 mb-1"
              to={"/forgot-password"}
            >
              Forgot Password?
            </Link>
            <p className="mb-0">
              Didn't have an account?{" "}
              <Link className="stretched-link" to="/register">
                Register Now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Login;
