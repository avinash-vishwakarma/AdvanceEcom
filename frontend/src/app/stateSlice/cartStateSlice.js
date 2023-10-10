import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const cartStateSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    updateCart: (state, { payload }) => {
      return payload;
    },
  },
});

export const { updateCart } = cartStateSlice.actions;

export default cartStateSlice.reducer;
