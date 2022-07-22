import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import providerApi from "../../api/providerApi";

export const getAll = createAsyncThunk(
  "/provider/getAll",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await providerApi.getAll();
      console.log(response);
      return response;
    } catch (error) {
      throw rejectWithValue(error.data.error);
    }
  }
);

const initialState = {
  providers: [],
  isShowModal: false,
  modalType: "detail",
};

const providerSlice = createSlice({
  name: "provider",
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
      state.providers = action.payload.providers;
    });
    builder.addCase(getAll.rejected, (state, action) => {
      state.providers = [];
    });
  },
});

const { reducer } = providerSlice;
export const { showModal, hideModal } = providerSlice.actions;

export default reducer;
