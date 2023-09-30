import React from "react";
import { Link } from "react-router-dom";

const AdminDashBoard = () => {
  return (
    <div className="container">
      <Link className="affan-element-item" to="/admin/categorys">
        Product Categorys
        <i className="bi bi-caret-right-fill fz-12"></i>
      </Link>
    </div>
  );
};

export default AdminDashBoard;
