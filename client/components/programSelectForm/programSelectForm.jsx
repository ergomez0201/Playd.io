import React, { useRef } from 'react';

import filterAndMakeReadWriteCopy from '../utils/dataCopy/filterAndMakeReadWriteCopy';

function ProgramSelectForm({ data, setProgramDetails, programNames }) {
  const selectValue = useRef(null);

  const onProgramChange = () => {
    const programName = selectValue.current.value;
    const programSongs = filterAndMakeReadWriteCopy(programName, data);

    console.log('programSongs: ', programSongs);

    const { programTitle, programStart, programEnd, host } = programSongs[0];

    setProgramDetails({ programTitle, programStart, programEnd, host });
  };

  return (
    <form>
      <label htmlFor="radio-shows">Program </label>
      <select ref={selectValue} id="radio-shows" onChange={onProgramChange} disabled={!data}>
        <option value="" hidden>
          Choose a program
        </option>
        {programNames}
      </select>
    </form>
  );
}

export default ProgramSelectForm;
