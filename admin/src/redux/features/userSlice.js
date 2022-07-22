import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import isAuth from "../../utils/authUtil";
import userApi from "../../api/userApi";

export const getAll = createAsyncThunk(
  "user/getAll",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await userApi.getAll();
      return response;
    } catch (error) {
      throw rejectWithValue(error.data.error);
    }
  }
);

const initialState = {
  users: [],
  errMsg: null,
  isShowModal: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    showModal: (state) => {
      state.isShowModal = true;
    },
    hideModal: (state) => {
      state.isShowModal = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAll.fulfilled, (state, action) => {
      state.users = action.payload.users;
    });

    builder.addCase(getAll.rejected, (state, action) => {
      state.users = null;
      state.errMsg = action.payload;
    });
  },
});

const { reducer } = userSlice;

export const { showModal, hideModal } = userSlice.actions;

export default reducer;
