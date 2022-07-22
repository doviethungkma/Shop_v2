import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productApi from "../../api/productApi";

export const getAll = createAsyncThunk(
  "/order/getAll",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await productApi.getAll();
      return response;
    } catch (error) {
      throw rejectWithValue(error.data.error);
    }
  }
);

const initialState = {
  products: [],
  isShowModal: false,
  modalType: "detail",
};

const productSlice = createSlice({
  name: "product",
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
      state.products = action.payload.products;
    });
    builder.addCase(getAll.rejected, (state, action) => {
      state.products = [];
    });
  },
});

const { reducer } = productSlice;
export const { showModal, hideModal } = productSlice.actions;

export default reducer;
