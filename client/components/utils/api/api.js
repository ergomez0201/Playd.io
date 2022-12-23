import fetcher from '../fetcher/fetcher';

export default async function getKCRW({ month, day, year }) {
  console.log('this is the month day year passed in getKCRW', month, day, year);
  const url = `/tracks?year=${year}&month=${month}&day=${day}`;
  const { data, error } = await fetcher(url);
  return {
    data,
    isLoading: !data && !error,
    isError: error,
  };
}
