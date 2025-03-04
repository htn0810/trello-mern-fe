import { API_ROOT } from "@/utils/constants";
import { mapOrder } from "@/utils/sorts";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  currentActiveBoard: null,
};

// use createAsyncThunk to call api asynchronous with extraReducers
export const fetchBoardDetailsAPI = createAsyncThunk(
  "activeBoard/fetchBoardDetailsAPI",
  async (boardId) => {
    const response = await axios.get(`${API_ROOT}/v1/boards/${boardId}`);
    return response.data;
  }
);

export const activeBoardSlice = createSlice({
  name: "activeBoard",
  initialState,
  // handle update data synchronous
  reducers: {
    updateCurrentActiveBoard: (state, action) => {
      const board = action.payload;

      state.currentActiveBoard = board;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBoardDetailsAPI.fulfilled, (state, action) => {
      let board = action.payload;

      board.columns = mapOrder(board?.columns, board?.columnOrderIds, "_id");
      board.columns.forEach((col) => {
        col.cards = mapOrder(col?.cards, col?.cardOrderIds, "_id");
      });

      state.currentActiveBoard = board;
    });
  },
});

export const { updateCurrentActiveBoard } = activeBoardSlice.actions;

export const selectCurrentActiveBoard = (state) => {
  return state.activeBoard.currentActiveBoard;
};

export const activeBoardReducer = activeBoardSlice.reducer;
