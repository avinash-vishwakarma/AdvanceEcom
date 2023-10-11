import { Route } from "react-router-dom";
import Protected from "../components/Protected";
import GenralLayout from "../layouts/GenralLayout";
import MyCart, { myCartLoader } from "../pages/user/MyCart";

const UserRoute = (
  <Route element={<GenralLayout />}>
    <Route element={<Protected auth />}>
      <Route path="/my-cart" loader={myCartLoader} element={<MyCart />} />
    </Route>
  </Route>
);

export default UserRoute;
