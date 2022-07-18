import { createSlice } from '@reduxjs/toolkit';

export const trackSlice = createSlice({
  name: 'track',
  initialState: { tracks: [] },
  reducers: {
    populateTracks: (state, action) => ({
      ...state,
      tracks: action.payload,
    }),
  },
});

// export const { reducerNames } = trackSlice.actions;

export default trackSlice.reducer;
