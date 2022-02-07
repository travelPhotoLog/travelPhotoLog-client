import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  signUpInfo: {
    email: "",
    profileUrl: "",
  },
};

const signUpSlice = createSlice({
  name: "signUp",
  initialState,
  reducers: {
    saveSignUpInfo: (state, action) => {
      const savedInfo = action.payload;
      state.signUpInfo = savedInfo;
    },
  },
});

export const signUpActions = signUpSlice.actions;
export default signUpSlice.reducer;
