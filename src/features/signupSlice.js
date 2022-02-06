import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  signupInfo: {
    email: "",
    profileUrl: "",
  },
};

const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    saveSignupInfo: (state, action) => {
      const savedInfo = action.payload;
      state.signupInfo = savedInfo;
    },
  },
});

export const signupActions = signupSlice.actions;
export default signupSlice.reducer;
