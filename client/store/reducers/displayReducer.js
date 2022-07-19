import { createSlice } from '@reduxjs/toolkit';

const displaySlice = createSlice({
  name: 'display',
  initialState: {
    date: null,
  },
  reducers: {
    dateUpdate: (state, action) => ({
      ...state,
      date: action.payload,
    }),
  },
});

export const { dateUpdate } = displaySlice.actions;

export default displaySlice.reducer;
