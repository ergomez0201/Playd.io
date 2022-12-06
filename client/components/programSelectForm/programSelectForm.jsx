import React, { useRef } from 'react';

import filterAndMakeReadWriteCopy from '../utils/dataCopy/filterAndMakeReadWriteCopy';

function ProgramSelectForm({ data, setProgramDetails, programNames }) {
  const selectValue = useRef(null);

  const onProgramChange = () => {
    // this will be a function to display the show/dj and the time that they are on
    // const programName = document.querySelector('#radio-shows').value;
    const programName = selectValue.current.value;
    const programSongs = filterAndMakeReadWriteCopy(programName, data);

    const programTitle = programSongs[0].program_title;
    const programStart = programSongs[0].program_start;
    const programEnd = programSongs[0].program_end;
    const { host } = programSongs[0];

    setProgramDetails({ programTitle, programStart, programEnd, host });
  };

  return (
    <form>
      <label htmlFor="radio-shows">Program </label>
      <select ref={selectValue} id="radio-shows" onChange={onProgramChange}>
        <option value="" hidden>
          Choose a program
        </option>
        {programNames}
      </select>
    </form>
  );
}

export default ProgramSelectForm;
