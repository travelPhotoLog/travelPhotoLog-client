import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  keyword: {
    region: "",
    tag: "",
  },
};

const searchingSlice = createSlice({
  name: "searching",
  initialState,
  reducers: {
    setKeyword: (state, action) => {
      const { region, tag } = action.payload;

      if (region) {
        state.keyword.region = region;
      } else {
        state.keyword.region = "";
      }

      if (tag) {
        state.keyword.tag = tag;
      } else {
        state.keyword.tag = "";
      }

      return state;
    },
  },
});

export const searchingActions = searchingSlice.actions;
export default searchingSlice.reducer;
