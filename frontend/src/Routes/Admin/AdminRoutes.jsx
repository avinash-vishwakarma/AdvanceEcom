import React from "react";
import AdminCateogryRouets from "./AdminCateogryRouets";
import AdminProductRoutes from "./AdminProductRoutes";
import { Route } from "react-router-dom";
import Protected from "../../components/Protected";
import GenralLayout from "../../layouts/GenralLayout";

const AdminRoutes = (
  <Route element={<Protected admin auth />} path="/admin">
    <Route element={<GenralLayout />}>
      {AdminCateogryRouets}
      {AdminProductRoutes}
    </Route>
  </Route>
);

export default AdminRoutes;
