import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isShowMenu: false,
};

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    showMenu: (state) => {
      state.isShowMenu = true;
    },
    hideMenu: (state) => {
      state.isShowMenu = false;
    },
  },
});

const { reducer } = menuSlice;

export const { showMenu, hideMenu } = menuSlice.actions;

export default reducer;
