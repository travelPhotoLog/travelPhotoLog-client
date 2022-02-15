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
    },
  },
});

export const postingPhotoActions = postingPhotoSlice.actions;
export default postingPhotoSlice.reducer;
