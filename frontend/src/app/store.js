import { configureStore } from "@reduxjs/toolkit";
import authStateSlice from "./stateSlice/authStateSlice";
import toasterAlertStateSlice from "./stateSlice/toasterAlertStateSlice";

const store = configureStore({
  reducer: {
    auth: authStateSlice,
    toaster: toasterAlertStateSlice,
  },
});

export default store;
