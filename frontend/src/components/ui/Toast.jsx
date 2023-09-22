import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideToaster } from "../../app/stateSlice/toasterAlertStateSlice";

const Toast = () => {
  const { show, data } = useSelector((store) => store.toaster);
  const dispatch = useDispatch();
  const hideToastHandler = () => {
    dispatch(hideToaster());
  };

  useEffect(() => {
    if (show) {
      setTimeout(hideToastHandler, data.duration || 3000);
    }
  }, [show]);

  let ToastIcon = "";

  switch (data?.type) {
    case "warning":
      ToastIcon = "bi bi-exclamation-diamond";
      break;

    case "danger":
      ToastIcon = "bi bi-exclamation-triangle";
      break;

    default:
      ToastIcon = "bi bi-bookmark-check";
  }

  return (
    <div
      className={`toast toast-autohide custom-toast-1 toast-${
        data?.type
      } home-page-toast fade ${show ? "show" : "hide"} `}
    >
      <div className="toast-body">
        <i className={`${ToastIcon} text-white h1 mb-0`}></i>
        <div className="toast-text ms-3 me-2">
          <p className="mb-1 text-white">{data?.title}</p>
          <small className="d-block">{data?.body}</small>
        </div>
      </div>
      <button
        className="btn btn-close btn-close-white position-absolute p-1"
        type="button"
        data-bs-dismiss="toast"
        aria-label="Close"
        onClick={hideToastHandler}
      ></button>
    </div>
  );
};

export default Toast;
