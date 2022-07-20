import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { dateUpdate } from '../../store/reducers/displayReducer';
import { useGetKcrwDataQuery } from '../../features/api/apiSlice';

import DateSelector from '../dateSelector/dateSelector';
import { dateToStringYMD } from '../utils/dateParser';

function ShowDisplay() {
  const [startDate, setStartDate] = useState(null);
  const [skip, setSkip] = useState(true);

  const dispatch = useDispatch();

  let stringYear;
  let stringMonth;
  let stringDay;
  let dateString;

  if (startDate) {
    dateString = dateToStringYMD(startDate);
    [stringYear, stringMonth, stringDay] = dateString.split('/');
  }

  useEffect(() => {
    dispatch(dateUpdate(dateString));
  }, [startDate]);

  const { data } = useGetKcrwDataQuery(
    { year: stringYear, month: stringMonth, day: stringDay },
    {
      skip,
    }
  );
  console.log('this is the data back from kcrw api: ', data);

  // parse through data that came back from kcrw api and create a datalist from the array
  if (data) {
    const programNameSet = new Set();
    data.forEach((program) => programNameSet.add(program.program_title));
    const programNames = [...programNameSet].map((program) => (
      <option value={program}>{program}</option>
    ));
    console.log('program names: ', programNames);

    return (
      <div>
        <p>This is the show display</p>
        <DateSelector setStartDate={setStartDate} startDate={startDate} setSkip={setSkip} />
        <form>
          <label htmlFor="radio-shows">Select A Program:</label>
          <select id="radio-shows">{programNames}</select>
        </form>
      </div>
    );
  }

  return (
    <div>
      <p>This is the show display</p>
      <DateSelector setStartDate={setStartDate} startDate={startDate} setSkip={setSkip} />
      <form>
        <input list="radio-shows" name="radio-show" disabled />
        {/* <datalist id="radio-shows" /> */}
      </form>
    </div>
  );
}

export default ShowDisplay;
