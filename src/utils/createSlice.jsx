import { createSlice } from "@reduxjs/toolkit";

const CategorySlice = createSlice({
  name: "category",
  initialState: [],
  reducers: {
    additem: (state, action) => {
      state.push(action.payload);
    },
  },
});
