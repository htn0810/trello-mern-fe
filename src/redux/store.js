import { activeBoardReducer } from "@/redux/activeBoard/activeBoardSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    activeBoard: activeBoardReducer,
  },
});
