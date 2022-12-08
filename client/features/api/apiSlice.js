import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import configData from '../../../config.json';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: `${configData.REACT_APP_SERVER_URL}` }),
  endpoints: (builder) => ({
    getKcrwData: builder.query({
      query: (arg) => {
        const { year, month, day } = arg;
        return { url: `/tracks?year=${year}&month=${month}&day=${day}` };
      },
    }),
  }),
});

export const { useGetKcrwDataQuery } = apiSlice;
