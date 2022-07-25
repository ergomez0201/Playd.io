import { createSlice } from '@reduxjs/toolkit';

const displaySlice = createSlice({
  name: 'display',
  initialState: {
    date: null,
    playlistTitle: null,
  },
  reducers: {
    dateUpdate: (state, action) => ({
      ...state,
      date: action.payload,
    }),
    playlistTitleUpdate: (state, action) => ({
      ...state,
      playlistTitle: action.payload,
    }),
  },
});

export const { dateUpdate, playlistTitleUpdate } = displaySlice.actions;

export default displaySlice.reducer;
