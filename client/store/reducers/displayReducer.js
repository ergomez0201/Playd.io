import { createSlice } from '@reduxjs/toolkit';

const displaySlice = createSlice({
  name: 'display',
  initialState: {
    date: null,
    playlistTitle: null,
    isShowDisplayVisible: true,
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
    isShowDisplayVisibleUpdate: (state, action) => ({
      ...state,
      isShowDisplayVisible: action.payload,
    }),
  },
});

export const { dateUpdate, playlistTitleUpdate, isShowDisplayVisibleUpdate } = displaySlice.actions;

export default displaySlice.reducer;
