import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    currentUser: JSON.parse(localStorage.getItem("user")) || null,
  },
  reducers: {
    login: (state, action) => {
      state.currentUser = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.currentUser = null;
      localStorage.removeItem("user");
    },
    update: (state, action) => {
      state.currentUser = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
  },
});

export const { login, logout, update } = usersSlice.actions;
export default usersSlice.reducer;