import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "./reducers/apiSlice";

export const store = configureStore({
  reducer: {
    api: apiSlice,
  },
});
