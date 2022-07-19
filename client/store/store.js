import { configureStore } from '@reduxjs/toolkit';
import tracksReducer from './reducers/tracksReducer';
import kcrwReducer from './reducers/kcrwReducer';
import displayReducer from './reducers/displayReducer';
import { apiSlice } from '../features/api/apiSlice';

export default configureStore({
  reducer: {
    tracks: tracksReducer,
    kcrw: kcrwReducer,
    display: displayReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});
