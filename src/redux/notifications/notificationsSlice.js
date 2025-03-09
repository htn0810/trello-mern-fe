import authorizeAxiosInstance from "@/utils/authorizeAxios";
import { API_ROOT } from "@/utils/constants";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentNotifications: null,
};

export const fetchInvitationsAPI = createAsyncThunk(
  "notifications/fetchInvitationsAPI",
  async () => {
    const response = await authorizeAxiosInstance.get(
      `${API_ROOT}/v1/invitations`
    );
    return response.data;
  }
);

export const updateBoardInvitationAPI = createAsyncThunk(
  "notifications/updateBoardInvitationAPI",
  async ({ status, invitationId }) => {
    const response = await authorizeAxiosInstance.put(
      `${API_ROOT}/v1/invitations/board/${invitationId}`,
      { status }
    );
    return response.data;
  }
);

export const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    clearCurrentNotifications: (state) => {
      state.currentNotifications = null;
    },
    addNotification: (state, action) => {
      state.currentNotifications.unshift(action.payload);
    },
    updateCurrentNotifications: (state, action) => {
      state.currentNotifications = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchInvitationsAPI.fulfilled, (state, action) => {
      let inCommingInvitations = action.payload;
      state.currentNotifications = Array.isArray(inCommingInvitations)
        ? inCommingInvitations.reverse()
        : [];
    });
    builder.addCase(updateBoardInvitationAPI.fulfilled, (state, action) => {
      const inCommingInvitation = action.payload;
      const getInvitation = state.currentNotifications.find(
        (inv) => inv._id === inCommingInvitation._id
      );
      getInvitation.boardInvitation = inCommingInvitation.boardInvitation;
    });
  },
});

export const {
  clearCurrentNotifications,
  addNotification,
  updateCurrentNotifications,
} = notificationsSlice.actions;

export const selectCurrentNotifications = (state) =>
  state.notifications.currentNotifications;

export const notificationsReducer = notificationsSlice.reducer;
