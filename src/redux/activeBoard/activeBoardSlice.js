import authorizeAxiosInstance from "@/utils/authorizeAxios";
import { API_ROOT } from "@/utils/constants";
import { mapOrder } from "@/utils/sorts";
import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  currentActiveBoard: null,
};

// use createAsyncThunk to call api asynchronous with extraReducers
export const fetchBoardDetailsAPI = createAsyncThunk(
  "activeBoard/fetchBoardDetailsAPI",
  async (boardId) => {
    const response = await authorizeAxiosInstance.get(
      `${API_ROOT}/v1/boards/${boardId}`
    );
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

    updateCardInBoard: (state, action) => {
      const updateCard = action.payload;
      console.log("🚀 ~ updateCard:", updateCard);
      const columnIndex = state.currentActiveBoard.columns.findIndex(
        (col) => col._id === updateCard.columnId
      );
      if (columnIndex !== -1) {
        const cardIndex = state.currentActiveBoard.columns[
          columnIndex
        ].cards.findIndex((card) => card._id === updateCard._id);

        if (cardIndex !== -1) {
          // Update card directly in state
          state.currentActiveBoard.columns[columnIndex].cards[cardIndex] =
            updateCard;
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBoardDetailsAPI.fulfilled, (state, action) => {
      let board = action.payload;

      board.FE_allUsers = board.owners.concat(board.members);

      board.columns = mapOrder(board?.columns, board?.columnOrderIds, "_id");
      board.columns.forEach((col) => {
        col.cards = mapOrder(col?.cards, col?.cardOrderIds, "_id");
      });

      state.currentActiveBoard = board;
    });
  },
});

export const { updateCurrentActiveBoard, updateCardInBoard } =
  activeBoardSlice.actions;

export const selectCurrentActiveBoard = (state) => {
  return state.activeBoard.currentActiveBoard;
};

export const activeBoardReducer = activeBoardSlice.reducer;
