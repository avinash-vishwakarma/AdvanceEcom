import React from "react";
import { Link } from "react-router-dom";

const AdminDashBoard = () => {
  return (
    <div className="container">
      <div className="affan-element-item">
        <div className="element-heading-wrapper">
          <i className="bi bi-list"></i>
          <div className="heading-text">
            <h6 className="mb-1">Inventory Options</h6>
            <span>Product and Cateorys Options.</span>
          </div>
        </div>
      </div>

      <Link className="affan-element-item" to="/admin/categorys">
        Product Categorys
        <i className="bi bi-caret-right-fill fz-12"></i>
      </Link>
      <Link className="affan-element-item" to="/admin/product/add">
        Create Products
        <i className="bi bi-caret-right-fill fz-12"></i>
      </Link>

      <div className="affan-element-item">
        <div className="element-heading-wrapper">
          <i className="bi bi-list"></i>
          <div className="heading-text">
            <h6 className="mb-1">UI Options</h6>
            <span>Banners , TopSelling Poducts.</span>
          </div>
        </div>
      </div>

      <Link className="affan-element-item" to="/admin/ui/banners">
        Banners
        <i className="bi bi-caret-right-fill fz-12"></i>
      </Link>
    </div>
  );
};

export default AdminDashBoard;
