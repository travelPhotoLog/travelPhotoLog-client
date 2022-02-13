import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searching: {
    region: "",
    tag: "",
  },
};

const searchingSlice = createSlice({
  name: "searching",
  initialState,
  reducers: {
    setKeyword: (state, action) => {
      state = action.payload;
    },
  },
});

export const searchingActions = searchingSlice.actions;
export default searchingSlice.reducer;
