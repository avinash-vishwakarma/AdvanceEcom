import React from "react";
import AdminDashBoard from "../../pages/Admin/AdminDashBoard";
import AdminProductsList from "../../pages/Admin/Product/AdminProductsList";
import AdminShowProduct from "../../pages/Admin/Product/AdminShowProduct";
import AdminAddProduct from "../../pages/Admin/Product/AdminAddProduct";
import NotFound from "../../pages/errors/NotFound";
import AdminBanners from "../../pages/Admin/ui/AdminBanners";
import adminProductsLoader from "../../loaders/adminProductsLoader";
import adminProductLoader from "../../loaders/adminProductLoader";
import cateoryPageLoader from "../../loaders/categoryPageLoader";
import adminEditProductCategorysLoader from "../../loaders/adminEditProductCategorysLoader";
import adminBannersLoader from "../../loaders/adminBannersLoader";
import { Route } from "react-router-dom";
import AdminProductEdit from "../../pages/Admin/Product/AdminProductEdit";

const AdminProductRoutes = (
  <>
    <Route path="dashboard" element={<AdminDashBoard />} />
    <Route
      path="products"
      loader={adminProductsLoader}
      element={<AdminProductsList />}
    />
    <Route path="product">
      <Route
        path=":id"
        loader={adminProductLoader}
        element={<AdminShowProduct />}
      />
      <Route
        path="add"
        loader={cateoryPageLoader}
        element={<AdminAddProduct />}
      />
      <Route
        path="edit/:id"
        loader={adminEditProductCategorysLoader}
        element={<AdminProductEdit />}
      />
    </Route>

    <Route path="ui">
      <Route index element={<NotFound />} />
      <Route
        path="banners"
        loader={adminBannersLoader}
        element={<AdminBanners />}
      />
    </Route>
  </>
);

export default AdminProductRoutes;
