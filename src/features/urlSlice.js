import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  url: "",
};

const urlSlice = createSlice({
  name: "url",
  initialState,
  reducers: {
    setUrl: (state, action) => {
      state.url = action.payload.url;

      return state;
    },
  },
});

export const urlAction = urlSlice.actions;
export default urlSlice.reducer;
