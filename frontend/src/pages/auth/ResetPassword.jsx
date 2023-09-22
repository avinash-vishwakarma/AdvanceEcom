import React, { useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import PasswordInput from "../../components/ui/Form/PasswordInput";
import Button from "../../components/ui/Genral/Button";
import useSendRequest from "../../hooks/useSendRequest";
import { useDispatch } from "react-redux";
import { logout } from "../../app/stateSlice/authStateSlice";
import { setToaster } from "../../app/stateSlice/toasterAlertStateSlice";
import Alert from "../../components/ui/Form/Alert";

const ResetPassword = () => {
  const { token } = useParams();
  const [searchParam] = useSearchParams();
  const [request, isLoading, response, error] = useSendRequest();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changePasswordSubmitHandler = (e) => {
    e.preventDefault();
    const changePasswordFormData = new FormData(e.target);
    changePasswordFormData.append("token", token);
    changePasswordFormData.append("email", searchParam.get("email"));

    request({
      url: "/reset-password",
      method: "post",
      data: changePasswordFormData,
      headers: {
        "Content-type": "multipart/formdata",
      },
    });
  };

  useEffect(() => {
    if (response) {
      // set globla notification here and redirct the user to /
      dispatch(
        setToaster({
          title: "Password Changed successfully",
          body: "Password Updated Successfully kidly LOGIN with your new password",
          type: "success",
          duration: 5000,
        })
      );
      navigate("/login", {
        replace: true,
      });
      dispatch(logout());
    }
  }, [response]);

  return (
    <>
      {/* <!-- Login Wrapper Area --> */}
      <div className="login-wrapper d-flex align-items-center justify-content-center">
        <div className="custom-container">
          <div className="text-center px-4">
            <img className="login-intro-img" src="/img/bg-img/36.png" alt="" />
          </div>

          {/* <!-- Register Form --> */}
          <div className="register-form mt-4">
            <form onSubmit={changePasswordSubmitHandler}>
              <h6 className="mb-3 text-center">Update your password</h6>

              <Alert error={error} />

              <PasswordInput name="password" placeholder="Enter Password" />

              <div className="mb-3" id="pswmeter"></div>
              <PasswordInput
                name="password_confirmation"
                placeholder="Confrim Password"
              />

              <Button type="submit" isLoading={isLoading}>
                Change Password
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
