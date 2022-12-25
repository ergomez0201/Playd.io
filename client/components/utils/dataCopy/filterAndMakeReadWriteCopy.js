// util function to create a read-write version of the data that matches program Name
function filterAndMakeReadWriteCopy(programName, rawData) {
  const programSongsRaw = rawData.filter(
    // checking if track.title is null is to prevent grabbing [BREAKS] in the show
    (track) => track.program_title === programName && track.title
  );

  // programSongsRaw is read only so make a copy to update object key/values
  const programSongs = JSON.parse(JSON.stringify(programSongsRaw));
  const filteredSongs = [];
  for (let i = 0; i < programSongs.length; i++) {
    const currSong = programSongs[i];
    filteredSongs.push({
      album: currSong.album,
      artist: currSong.artist,
      date: currSong.date,
      host: currSong.host,
      programEnd: currSong.program_end,
      programStart: currSong.program_start,
      programTitle: currSong.program_title,
      spotifyId: currSong.spotify_id,
      spotifyPreview: currSong.spotify_preview,
      playId: currSong.play_id,
      title: currSong.title,
    });
  }
  return filteredSongs;
}

export default filterAndMakeReadWriteCopy;
