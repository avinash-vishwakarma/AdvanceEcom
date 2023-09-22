import React from "react";
import { Outlet } from "react-router-dom";

// Components
import Toast from "../components/ui/toast";

const RootLayout = () => {
  return (
    <React.Fragment>
      {/* {toaster.data && <Toast />} */}
      <Toast />
      <Outlet />
    </React.Fragment>
  );
};

export default RootLayout;
