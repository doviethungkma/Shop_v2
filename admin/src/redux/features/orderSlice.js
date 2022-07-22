import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import orderApi from "../../api/orderApi";

export const getAll = createAsyncThunk(
  "/order/getAll",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await orderApi.getAll();
      return response;
    } catch (error) {
      throw rejectWithValue(error.data.error);
    }
  }
);

const initialState = {
  orders: [],
  isShowModal: false,
  isShowProductModal: false,
  modalType: "detail",
};

const orderSlice = createSlice({
  name: "order",
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
    showProductModal: (state, action) => {
      state.isShowProductModal = true;
    },
    hideProductModal: (state) => {
      state.isShowProductModal = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAll.fulfilled, (state, action) => {
      state.orders = action.payload.orders;
    });
    builder.addCase(getAll.rejected, (state, action) => {
      state.orders = [];
    });
  },
});

const { reducer } = orderSlice;
export const { showModal, hideModal, showProductModal, hideProductModal } =
  orderSlice.actions;

export default reducer;
