import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogin: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.user = payload;
      if (payload === null) {
        localStorage.removeItem("user");
      } else {
        localStorage.setItem("user", JSON.stringify(payload));
      }
    },
    login: (state, { payload }) => {
      state.isLogin = true;
      state.user = payload;
      localStorage.setItem("user", JSON.stringify(payload));
    },
    logout: (state) => {
      state.isLogin = false;
      state.user = null;
      localStorage.removeItem("user");
    },
  },
});

export const { setUser, login, logout } = authSlice.actions;

export default authSlice.reducer;
