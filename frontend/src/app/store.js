import { configureStore } from "@reduxjs/toolkit";
import authStateSlice from "./stateSlice/authStateSlice";
import toasterAlertStateSlice from "./stateSlice/toasterAlertStateSlice";
import cartStateSlice from "./stateSlice/cartStateSlice";

const store = configureStore({
  reducer: {
    auth: authStateSlice,
    toaster: toasterAlertStateSlice,
    cart: cartStateSlice,
  },
});

export default store;
