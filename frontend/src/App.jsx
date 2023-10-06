import React, { useEffect } from "react";
import {
  Route,
  RouterProvider,
  createRoutesFromElements,
  createBrowserRouter,
  useNavigate,
} from "react-router-dom";
import axios from "axios";

// redux
import { useDispatch, useSelector } from "react-redux";

// layouts
import GenralLayout from "./layouts/GenralLayout";
import RootLayout from "./layouts/RootLayout";
// pages
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Protected from "./components/Protected";
import Logout from "./pages/auth/Logout";
import { login, logout, setUser } from "./app/stateSlice/authStateSlice";
import VerifyEmail from "./pages/auth/VerifyEmail";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import NotFound from "./pages/errors/NotFound";
import UserProfile from "./pages/User/UserProfile";
import AdminDashBoard from "./pages/Admin/AdminDashBoard";
import AdminAddCateogry from "./pages/Admin/Category/AdminAddCateogry";
import AdminCategorys from "./pages/Admin/Category/AdminCategorys";
import cateoryPageLoader from "./loaders/categoryPageLoader";
import AdminUpdateCategory from "./pages/Admin/Category/AdminUpdateCategory";
import adminUpdateLoader from "./loaders/adminUpdateLoader";
import AdminAddProduct from "./pages/Admin/Product/AdminAddProduct";
import AdminShowProduct from "./pages/Admin/Product/AdminShowProduct";
import adminProductLoader from "./loaders/adminProductLoader";
import AdminProductsList from "./pages/Admin/Product/AdminProductsList";
import adminProductsLoader from "./loaders/adminProductsLoader";
import AdminProductEdit from "./pages/Admin/Product/AdminProductEdit";
import adminEditProductCategorysLoader from "./loaders/adminEditProductCategorysLoader";
import AdminBanners from "./pages/Admin/ui/AdminBanners";
import adminBannersLoader from "./loaders/adminBannersLoader";
import homePageLoader from "./loaders/user/homePageLoader";

const App = () => {
  const dispatch = useDispatch();

  const rootPageLoader = () => {
    axios.defaults.baseURL =
      import.meta.env.VITE_REACT_APP_API_BASE_URL || "http://127.0.0.1:8000";
    axios.defaults.withCredentials = true;

    axios.get("/sanctum/csrf-cookie").catch((err) => {
      console.log(err);
    });

    // check id the user is present in the localstorage

    const localUser = JSON.parse(localStorage.getItem("user"));

    if (localUser?.id) {
      return axios
        .get("/api/user")
        .then((response) => {
          dispatch(login(response.data));
          return null;
        })
        .catch((err) => {
          // session expired
          axios.post("/logout").then(() => {
            dispatch(logout());
          });
          return null;
        });
    } else if (localUser) {
      dispatch(setUser(localUser));
    }
    return null;
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" loader={rootPageLoader} element={<RootLayout />}>
        {/* genralLayout */}
        <Route element={<GenralLayout />}>
          <Route index loader={homePageLoader} element={<Home />} />
        </Route>
        {/* guest */}
        <Route element={<Protected guest />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/password-reset/:token" element={<ResetPassword />} />
        </Route>

        {/* auth */}

        <Route element={<Protected redirect="/login" auth />}>
          <Route path="/logout" element={<Logout />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          {/* auth | GenralLayout */}
          <Route element={<GenralLayout />}>
            <Route path="/user-profile" element={<UserProfile />} />
            <Route element={<Protected admin />} path="/admin">
              <Route path="dashboard" element={<AdminDashBoard />} />
              <Route path="categorys">
                <Route
                  index
                  element={<AdminCategorys />}
                  loader={cateoryPageLoader}
                />
                <Route path="add" element={<AdminAddCateogry />} />
                <Route
                  path="update/:id"
                  loader={adminUpdateLoader}
                  element={<AdminUpdateCategory />}
                />
              </Route>
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
            </Route>
          </Route>
        </Route>

        {/* auth | admin | GenralLayout */}

        {/* Genral Layout */}
        <Route element={<GenralLayout />}>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
