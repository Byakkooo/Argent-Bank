import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: null,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.profile = action.payload;
      state.error = null;
    },

    setUserError: (state, action) => {
      state.error = action.payload;
    },

    clearProfile: (state) => {
      state.profile = null;
      state.error = null;
    },
  },
});

export const {
  setProfile,
  setUserError,
  clearProfile,
} = userSlice.actions;

export default userSlice.reducer;