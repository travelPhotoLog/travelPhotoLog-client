import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import signUpReducer from "../features/signupSlice";
import userReducer from "../features/userSlice";
import photoReducer from "../features/photoSlice";
import postingPhotoReducer from "../features/postingPhotoSlice";
import searchingReducer from "../features/searchingSlice";
import urlReducer from "../features/urlSlice";

const store = configureStore({
  reducer: {
    signUp: signUpReducer,
    user: userReducer,
    photo: photoReducer,
    postingPhoto: postingPhotoReducer,
    searching: searchingReducer,
    url: urlReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
});

export default store;
