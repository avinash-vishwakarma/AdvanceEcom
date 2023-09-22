import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/ui/Genral/Button";
import { useNavigate, useSearchParams } from "react-router-dom";
import useSendRequest from "../../hooks/useSendRequest";
import { setToaster } from "../../app/stateSlice/toasterAlertStateSlice";
import Alert from "../../components/ui/Form/Alert";

const VerifyEmail = () => {
  const auth = useSelector((store) => store.auth);
  const [searchParam] = useSearchParams();
  const navigate = useNavigate();
  const [request, isLoading, response, error] = useSendRequest();
  const [btnIsReady, setBtnIsReady] = useState(true);
  const dispatch = useDispatch();

  const VerifiedStatus = searchParam.get("verified");

  useEffect(() => {
    if (VerifiedStatus) {
      setTimeout(() => {
        navigate("/", {
          replace: true,
        });
      }, 2000);
    }
  }, [VerifiedStatus]);

  const resendClickHandler = () => {
    setBtnIsReady(false);

    request({
      url: "/email/verification-notification",
      method: "post",
    });
  };

  useEffect(() => {
    if (response) {
      dispatch(
        setToaster({
          title: "Email Resend Successfully",
          body: "Kindly Check you email account for verification link email",
          type: "success",
        })
      );
      setTimeout(() => {
        setBtnIsReady(true);
      }, 60000);
    }
  }, [response]);

  return (
    <>
      {/* <!-- Login Wrapper Area --> */}
      <div className="login-wrapper d-flex align-items-center justify-content-center">
        <div className="custom-container">
          {!VerifiedStatus && (
            <div className="text-center">
              <img
                className="mx-auto mb-4 d-block"
                src="img/bg-img/38.png"
                alt=""
              />
              <h3>Verify Your Email Address</h3>
              <p className="mb-4">
                Kindly Click the Verification link sent to you email address{" "}
                <strong>{auth.user.email}</strong>
              </p>
              {response && <p className="mb-4">{response?.data.status}</p>}
            </div>
          )}

          {VerifiedStatus && (
            <div className="text-center">
              <img
                className="mx-auto mb-4 d-block"
                src="img/custom/emailConfrim.svg"
                alt=""
              />
              <h3>Email Verified</h3>
              <p className="mb-4">
                Thankyou For Verifing Your email{" "}
                {/* <strong>{auth.user.email}</strong> */}
              </p>
            </div>
          )}

          {/* <!-- Term & Privacy Info --> */}

          {!VerifiedStatus && (
            <div className="login-meta-data text-center">
              <Alert error={error} />

              <p className="mt-3 mb-0">
                Don't received the Email?{" "}
                {!btnIsReady && (
                  <>
                    <br /> wait for 1 min before again resending email
                  </>
                )}
                <Button
                  type="button"
                  btnclassName={"w-100 mt-4"}
                  onClick={resendClickHandler}
                  isLoading={!btnIsReady}
                >
                  Resend Email
                </Button>
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default VerifyEmail;
