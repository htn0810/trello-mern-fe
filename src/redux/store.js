import { activeBoardReducer } from "@/redux/activeBoard/activeBoardSlice";
import { userReducer } from "@/redux/user/userSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    activeBoard: activeBoardReducer,
    user: userReducer,
  },
});
