import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentActiveCard: null,
  isShowCardModal: false,
};

export const activeCardSlice = createSlice({
  name: "activeCard",
  initialState,
  reducers: {
    showModalCard: (state) => {
      state.isShowCardModal = true;
    },
    hideModalCard: (state) => {
      state.isShowCardModal = false;
    },
    clearCurrentActiveCard: (state) => {
      state.currentActiveCard = null;
    },
    updateCurrentActiveCard: (state, action) => {
      state.currentActiveCard = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const {
  clearCurrentActiveCard,
  updateCurrentActiveCard,
  showModalCard,
  hideModalCard,
} = activeCardSlice.actions;

export const selectCurrentActiveCard = (state) =>
  state.activeCard.currentActiveCard;

export const selectIsShowCardModal = (state) =>
  state.activeCard.isShowCardModal;

export const activeCardReducer = activeCardSlice.reducer;
