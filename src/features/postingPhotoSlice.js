import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  photoUrl: [],
};

const postingPhotoSlice = createSlice({
  name: "postingPhoto",
  initialState,
  reducers: {
    savePhotoUrlInfo: (state, action) => {
      state.photoUrl.push(action.payload);
      return state;
    },
    resetPhotoUrl: (state, action) => {
      console.log(111111111);
      state.photoUrl = [];
      return state;
    },
  },
});

export const postingPhotoActions = postingPhotoSlice.actions;
export default postingPhotoSlice.reducer;
