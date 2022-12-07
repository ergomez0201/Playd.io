import { createSlice } from '@reduxjs/toolkit';

const displaySlice = createSlice({
  name: 'display',
  initialState: {
    date: null,
    playlistTitle: null,
    isShowDisplayVisible: true,
    spotifyPlaylistName: null,
    isLoggedIn: false,
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
    spotifyPlaylistNameUpdate: (state, action) => ({
      ...state,
      spotifyPlaylistName: action.payload,
    }),
    isLoggedInUpdate: (state, action) => ({
      ...state,
      isLoggedIn: action.payload,
    }),
  },
});

export const {
  dateUpdate,
  playlistTitleUpdate,
  isShowDisplayVisibleUpdate,
  spotifyPlaylistNameUpdate,
  isLoggedInUpdate,
} = displaySlice.actions;

export default displaySlice.reducer;
