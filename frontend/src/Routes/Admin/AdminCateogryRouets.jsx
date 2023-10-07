import React from "react";
import { Route } from "react-router-dom";
import AdminCategorys from "../../pages/Admin/Category/AdminCategorys";
import AdminAddCateogry from "../../pages/Admin/Category/AdminAddCateogry";
import AdminUpdateCategory from "../../pages/Admin/Category/AdminUpdateCategory";
import adminUpdateLoader from "../../loaders/adminUpdateLoader";
import cateoryPageLoader from "../../loaders/categoryPageLoader";

const AdminCateogryRouets = (
  <Route path="categorys">
    <Route index element={<AdminCategorys />} loader={cateoryPageLoader} />
    <Route path="add" element={<AdminAddCateogry />} />
    <Route
      path="update/:id"
      loader={adminUpdateLoader}
      element={<AdminUpdateCategory />}
    />
  </Route>
);

export default AdminCateogryRouets;
