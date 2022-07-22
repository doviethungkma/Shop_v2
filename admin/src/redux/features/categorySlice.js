import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import categoryApi from "../../api/categoryApi";

export const getAll = createAsyncThunk(
  "/category/getAll",
  async (obj, { rejectWithValue }) => {
    try {
      console.log("getAll");
      const response = await categoryApi.getAll();
      return response;
    } catch (error) {
      throw rejectWithValue(error.data.error);
    }
  }
);

const initialState = {
  categories: [],
  isShowModal: false,
  modalType: "detail",
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    showModal: (state, action) => {
      state.isShowModal = true;
      state.modalType = action.payload;
    },
    hideModal: (state) => {
      state.isShowModal = false;
      state.modalType = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAll.fulfilled, (state, action) => {
      state.categories = action.payload.categories;
    });
    builder.addCase(getAll.rejected, (state, action) => {
      state.categories = [];
    });
  },
});

const { reducer } = categorySlice;
export const { showModal, hideModal } = categorySlice.actions;

export default reducer;
