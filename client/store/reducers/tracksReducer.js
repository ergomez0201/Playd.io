import { createSlice } from '@reduxjs/toolkit';

export const trackSlice = createSlice({
  name: 'track',
  initialState: { tracks: null },
  reducers: {
    populateTracks: (state, action) => ({
      ...state,
      tracks: action.payload,
    }),
  },
});

export const { populateTracks } = trackSlice.actions;

export default trackSlice.reducer;
