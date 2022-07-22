import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDelete: {
    status: false,
    type: "",
    id: "",
  },
};

const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    showDeletePopup: (state, action) => {
      state.isDelete.status = true;
      state.isDelete.type = action.payload.type;
      state.isDelete.id = action.payload.id;
    },
    hideDeletePopup: (state) => {
      state.isDelete.status = false;
      state.isDelete.type = "";
      state.isDelete.id = "";
    },
  },
  extraReducers: (builder) => {},
});

const { reducer } = commonSlice;

export const { showDeletePopup, hideDeletePopup } = commonSlice.actions;

export default reducer;
