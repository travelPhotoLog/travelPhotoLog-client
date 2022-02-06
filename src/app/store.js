import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import signupReducer from "../features/signupSlice";
import userReducer from "../features/userSlice";

const store = configureStore({
  reducer: {
    signup: signupReducer,
    user: userReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
});

export default store;
