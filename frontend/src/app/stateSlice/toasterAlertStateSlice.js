import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  show: false,
  data: null,
};

const toasterSlice = createSlice({
  name: "toaster",
  initialState: initialState,
  reducers: {
    setToaster: (state, { payload }) => {
      state.show = true;
      state.data = payload;
    },
    hideToaster: (state) => {
      return initialState;
    },
  },
});

export const { setToaster, hideToaster } = toasterSlice.actions;

export default toasterSlice.reducer;
