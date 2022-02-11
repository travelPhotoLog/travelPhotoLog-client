import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentIndex: 0,
};

const photoSlice = createSlice({
  name: "photo",
  initialState,
  reducers: {
    updateIndex: (state, action) => {
      state.currentIndex = action.payload.index;
    },
  },
});

export const photoActions = photoSlice.actions;
export default photoSlice.reducer;
