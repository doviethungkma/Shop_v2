import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import isAuth from "../../utils/authUtil";
import authUtils from "../../utils/authUtil";
import authApi from "../../api/authApi";

const user = authUtils.isAuthenticated();

export const register = createAsyncThunk(
  "auth/register",
  async (
    { username, password, confirmPassword, email },
    { rejectWithValue }
  ) => {
    try {
      const response = await authApi.signup({
        username,
        password,
        confirmPassword,
        email,
      });

      localStorage.setItem("token", response.token);
      localStorage.setItem("username", response.user.username);

      return response;
    } catch (error) {
      throw rejectWithValue(error.data.error);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await authApi.login({ username, password });
      localStorage.setItem("token", response.token);
      localStorage.setItem("username", response.user.username);
      return response;
    } catch (error) {
      throw rejectWithValue(error.data.error);
    }
  }
);

const initialState = {
  username: user ? user.username : null,
  id: user ? user.id : null,
  role: user ? user.role : null,
  errMsg: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload.user;
    });

    builder.addCase(login.rejected, (state, action) => {
      state.user = null;
      state.errMsg = action.payload;
    });

    builder.addCase(register.fulfilled, (state, action) => {
      state.user = action.payload.user;
    });

    builder.addCase(register.rejected, (state, action) => {
      state.user = null;
      state.errMsg = action.payload;
    });
  },
});

const { reducer } = authSlice;

export const { logout } = authSlice.actions;

export default reducer;
