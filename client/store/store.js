import { configureStore } from '@reduxjs/toolkit';
import tracksReducer from './reducers/tracksReducer';
import kcrwReducer from './reducers/kcrwReducer';

export default configureStore({
  reducer: {
    tracks: tracksReducer,
    kcrw: kcrwReducer,
  },
});
