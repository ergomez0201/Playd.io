import fetcher from '../fetcher/fetcher';

export async function getKCRW({ month, day, year }) {
  const url = `/tracks?year=${year}&month=${month}&day=${day}`;
  const { data, error } = await fetcher(url);
  return {
    data,
    isLoading: !data && !error,
    isError: error,
  };
}

export function fetchMissingIds(programSongs) {
  const fetches = [];

  for (let i = 0; i < programSongs.length; i++) {
    const url = `/search?title=${programSongs[i].title}&artist=${programSongs[i].artist}`;
    if (!programSongs[i].spotifyId) {
      fetches.push(
        fetcher(url).then(({ data, error }) => {
          if (error) {
            // TODO: handle error logic
          }
          if (data.length) {
            programSongs[i].spotifyId = data[0].uri.split(':')[2];
            programSongs[i].spotifyPreview = data[0].preview_url;
          }
        })
      );
    }
  }
  return fetches;
}
