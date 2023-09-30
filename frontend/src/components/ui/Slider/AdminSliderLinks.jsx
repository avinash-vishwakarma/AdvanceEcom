import React from "react";
import NavSliderLink from "./NavSliderLink";

const AdminSliderLinks = () => {
  return (
    <React.Fragment>
      <NavSliderLink
        to="/admin/dashboard"
        icon="bi bi-person-badge-fill"
        text="Admin Dashboard"
      />
    </React.Fragment>
  );
};

export default AdminSliderLinks;
