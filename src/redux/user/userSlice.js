import authorizeAxiosInstance from "@/utils/authorizeAxios";
import { API_ROOT } from "@/utils/constants";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
};

// use createAsyncThunk to call api asynchronous with extraReducers
export const loginUserAPI = createAsyncThunk(
  "user/loginUserAPI",
  async (data) => {
    const response = await authorizeAxiosInstance.post(
      `${API_ROOT}/v1/users/login`,
      data
    );
    return response.data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  // handle update data synchronous
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUserAPI.fulfilled, (state, action) => {
      const user = action.payload;

      state.currentUser = user;
    });
  },
});

export const {} = userSlice.actions;

export const selectCurrentUser = (state) => {
  return state.user.currentUser;
};

export const userReducer = userSlice.reducer;
