import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

// components
import EmailInput from "../../components/ui/Form/EmailInput";
import TextInput from "../../components/ui/Form/TextInput";
import PasswordInput from "../../components/ui/Form/PasswordInput";
// redux
import { login } from "../../app/stateSlice/authStateSlice";
import { useDispatch } from "react-redux";
import useSendRequest from "../../hooks/useSendRequest";
import Button from "../../components/ui/Genral/Button";
import Alert from "../../components/ui/Form/Alert";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [request, isLoading, response, error] = useSendRequest();

  const registerSubmitHandler = (e) => {
    e.preventDefault();
    const registerFromData = new FormData(e.target);
    request({
      url: "/register",
      method: "post",
      data: registerFromData,
      headers: {
        "Content-type": "multipart/formdata",
      },
    });
  };

  useEffect(() => {
    if (response) {
      dispatch(login(response.data));
      // *** make the email verification work
      navigate("/verify-email", {
        replace: true,
      });
    }
  }, [response]);

  return (
    <React.Fragment>
      {/* <!-- Back Button --> */}
      <div className="login-back-button">
        <Link to={-1}>
          <i className="bi bi-arrow-left-short"></i>
        </Link>
      </div>

      {/* <!-- Login Wrapper Area --> */}
      <div className="login-wrapper d-flex align-items-center justify-content-center">
        <div className="custom-container">
          <div className="text-center px-4">
            <img className="login-intro-img" src="img/bg-img/36.png" alt="" />
          </div>

          {/* <!-- Register Form --> */}
          <div className="register-form mt-4">
            <h6 className="mb-3 text-center">
              Register to continue to the Affan
            </h6>

            <Alert error={error} />

            <form onSubmit={registerSubmitHandler}>
              <EmailInput name={"email"} />

              <TextInput name={"name"} placeholder="Enter Name" />

              <PasswordInput name="password" />
              <PasswordInput
                name="password_confirmation"
                placeholder="Confrim Password"
              />

              <div className="mb-3" id="pswmeter"></div>

              <Button isLoading={isLoading} type="submit">
                Register
              </Button>
            </form>
          </div>

          {/* <!-- Login Meta --> */}
          <div className="login-meta-data text-center">
            <p className="mt-3 mb-0">
              Already have an account?{" "}
              <Link className="stretched-link" to="/login">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Register;
