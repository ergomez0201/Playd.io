import React, { useRef } from 'react';

import filterAndMakeReadWriteCopy from '../utils/dataCopy/filterAndMakeReadWriteCopy';

function ProgramSelectForm({
  fullTrackList,
  setProgramDetails,
  programNames,
  setCurrentTrackList,
}) {
  const selectValue = useRef(null);

  const onProgramChange = () => {
    const programName = selectValue.current.value;
    const programSongs = filterAndMakeReadWriteCopy(programName, fullTrackList);

    const { programTitle, programStart, programEnd, host } = programSongs[0];

    setCurrentTrackList(programSongs);
    setProgramDetails({ programTitle, programStart, programEnd, host });
  };

  return (
    <form>
      <label htmlFor="radio-shows">Program </label>
      <select
        ref={selectValue}
        id="radio-shows"
        onChange={onProgramChange}
        disabled={!fullTrackList}
      >
        <option value="" hidden>
          Choose a program
        </option>
        {programNames}
      </select>
    </form>
  );
}

export default ProgramSelectForm;
