import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
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
