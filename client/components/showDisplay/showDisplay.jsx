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

  function onProgramChange(e) {
    const programName = document.querySelector('#radio-shows').value;
    // need to select the select field to grab the target value
    console.log(programName);
    const programSongs = data.filter(
      (track) => track.program_title === programName && track.title !== null
    );
    // console.log(programSongs);
    // iterate through the programSongs array
    // Promise.all(
    programSongs.forEach((track, index) => {
      if (track.spotify_id === null) {
        console.log(track.title, index);
        fetch(`/api/search?title=${track.title}&artist=${track.artist}`)
          .then((res) => res.json())
          .then((uri) => {
            console.log(track.title, index);
            console.log(uri, index);
            // track.spotify_id = uri;
            // update programSongs by track[index].spotify_id = uri
            // also don't forget to extract the uri by itself
          })
          .catch((err) => console.log(err));
      }
    });
    // ).then(() => {
    //   programSongs.forEach((track) => {
    //     if (track.spotify_id === null) {
    //       console.log(track.title);
    //     }
    // });
    // });
    // check if the spotify_id of any are null, and if so we want to send a mutation to spotify API to query this data

    // once data comes back, then we want to send another request to spotify API for all the info we need as a query to save to state
  }

  // parse through data that came back from kcrw api and create a datalist from the array
  if (data) {
    const programNameSet = new Set();
    data.forEach((program) => programNameSet.add(program.program_title));
    const programNames = [...programNameSet].map((program) => (
      <option key={program} value={program}>
        {program}
      </option>
    ));
    console.log('program names: ', programNames);

    return (
      <div>
        <p>This is the show display</p>
        <DateSelector setStartDate={setStartDate} startDate={startDate} setSkip={setSkip} />
        <form>
          <label htmlFor="radio-shows">Select A Program:</label>
          <select id="radio-shows">{programNames}</select>
          <button
            type="button"
            onClick={(e) => {
              onProgramChange(e);
            }}
          >
            Search
          </button>
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
