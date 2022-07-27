import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { dateUpdate } from '../../store/reducers/displayReducer';
import { populateTracks } from '../../store/reducers/tracksReducer';
import { useGetKcrwDataQuery } from '../../features/api/apiSlice';

import DateSelector from '../dateSelector/dateSelector';
import { dateToStringYMD } from '../utils/dateParser/dateParser';

function ShowDisplay() {
  // temporary state for development
  const [environment, setEnvironment] = useState('dev');
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
  // console.log('this is the data back from kcrw api: ', data);

  function onProgramChange(e) {
    const programName = document.querySelector('#radio-shows').value;
    // need to select the select field to grab the target value
    console.log(programName);
    const programSongsRaw = data.filter(
      (track) => track.program_title === programName && track.title !== null
    );

    const programSongs = JSON.parse(JSON.stringify(programSongsRaw));
    // console.log('these are the program songs: ', programSongs);
    // iterate through the programSongs array
    // TODO: have temporary condition to only fetch these things once I'm further down the line, I have dummy data to start formatting

    if (environment === 'dev') {
      dispatch(populateTracks(programSongs));
    } else {
      const fetches = [];
      for (let i = 0; i < programSongs.length; i++) {
        if (programSongs[i].spotify_id === null) {
          console.log(programSongs[i].spotify_id, i);
          fetches.push(
            fetch(`/api/search?title=${programSongs[i].title}&artist=${programSongs[i].artist}`)
              .then((res) => res.json())
              .then((url) => {
                const { spotifyUri, albumImage, albumImageLarge } = url;
                if (spotifyUri) {
                  const uriString = spotifyUri.split(':')[2];
                  // track.spotify_id = uriString;
                  programSongs[i].spotify_id = uriString;
                  // console.log(programSongs[index].spotify_id, uriString);
                }
                if (albumImage && albumImageLarge) {
                  programSongs[i].albumImage = albumImage;
                  programSongs[i].albumImageLarge = albumImageLarge;
                }
              })
              .catch((err) => console.log(err))
          );
        }
      }

      Promise.all(fetches).then(() => {
        console.log('programSongs after all promises resolved: ', programSongs);
        dispatch(populateTracks(programSongs));
      });
    }
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
