import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import couponApi from "../../api/couponApi";

export const getAll = createAsyncThunk(
  "/coupon/getAll",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await couponApi.getAll();
      console.log(response);
      return response;
    } catch (error) {
      throw rejectWithValue(error.data.error);
    }
  }
);

const initialState = {
  coupons: [],
  isShowModal: false,
  modalType: "detail",
};

const couponSlice = createSlice({
  name: "coupon",
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
      state.coupons = action.payload.coupons;
    });
    builder.addCase(getAll.rejected, (state, action) => {
      state.coupons = [];
    });
  },
});

const { reducer } = couponSlice;
export const { showModal, hideModal } = couponSlice.actions;

export default reducer;
