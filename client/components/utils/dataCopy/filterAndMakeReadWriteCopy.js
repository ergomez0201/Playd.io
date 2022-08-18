// util function to create a read-write version of the data that matches program Name
function filterAndMakeReadWriteCopy(programName, rawData) {
  const programSongsRaw = rawData.filter(
    // checking if track.title is null is to prevent grabbing [BREAKS] in the show
    (track) => track.program_title === programName && track.title !== null
  );

  // programSongsRaw is read only so make a copy to update object key/values
  const programSongs = JSON.parse(JSON.stringify(programSongsRaw));
  return programSongs;
}

export default filterAndMakeReadWriteCopy;
