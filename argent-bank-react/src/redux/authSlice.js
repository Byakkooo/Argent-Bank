import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  isAuthenticated: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    },

    loginFailure: (state, action) => {
      state.token = null;
      state.isAuthenticated = false;
      state.error = action.payload;
    },

    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
    },
  },
});

export const { loginSuccess, loginFailure, logout } = authSlice.actions;

export default authSlice.reducer;