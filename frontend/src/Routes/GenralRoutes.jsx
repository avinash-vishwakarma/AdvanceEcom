import { Route } from "react-router-dom";
import GenralLayout from "../layouts/GenralLayout";
import homePageLoader from "../loaders/user/homePageLoader";
import Home from "../pages/Home";
import ProductsList, {
  ProductListLoader,
} from "../pages/Products/ProductsList";
import ProductDetails, {
  productDetailsLoader,
} from "../pages/Products/ProductDetails";

const GenralRoutes = (
  <Route element={<GenralLayout />}>
    {/* Layout : GenralLayout , protected : null*/}
    <Route index loader={homePageLoader} element={<Home />} />
    <Route
      path="products"
      loader={ProductListLoader}
      element={<ProductsList />}
    />
    <Route
      path="product/:id"
      loader={productDetailsLoader}
      element={<ProductDetails />}
    />
  </Route>
);

export default GenralRoutes;
