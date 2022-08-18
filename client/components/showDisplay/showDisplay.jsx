import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { dateUpdate, isShowDisplayVisibleUpdate } from '../../store/reducers/displayReducer';
import { populateTracks } from '../../store/reducers/tracksReducer';
import { useGetKcrwDataQuery } from '../../features/api/apiSlice';

import DateSelector from '../dateSelector/dateSelector';
import ProgramDetailsDisplay from '../programDetailsDisplay/programDetailsDisplay';
import { dateToStringYMD } from '../utils/dateParser/dateParser';
import filterAndMakeReadWriteCopy from '../utils/dataCopy/filterAndMakeReadWriteCopy';

import styles from './showDisplay.styles.scss';

function ShowDisplay() {
  // temporary environment variable for development
  const environment = 'dev';

  /*
    local state:
      startDate used to set date for DatePicker
      programDetails passed as a prop to programDetailsDisplay
      skip assures that the fetch for tracks doesn't happen until a date has been chosen
  */
  const [startDate, setStartDate] = useState(null);
  const [programDetails, setProgramDetails] = useState(null);
  const [skip, setSkip] = useState(true);

  const dispatch = useDispatch();

  // stringified date variables
  let stringYear;
  let stringMonth;
  let stringDay;
  let dateString;

  if (startDate) {
    dateString = dateToStringYMD(startDate);
    [stringYear, stringMonth, stringDay] = dateString.split('/');
  }

  // useEffect(() => {
  //   dispatch(dateUpdate(dateString));
  // }, [startDate]);

  const { data } = useGetKcrwDataQuery(
    { year: stringYear, month: stringMonth, day: stringDay },
    {
      skip,
    }
  );
  console.log('this is the data back from kcrw api: ', data);

  function onProgramChange(e) {
    // this will be a function to display the show/dj and the time that they are on
    const programName = document.querySelector('#radio-shows').value;
    const programSongs = filterAndMakeReadWriteCopy(programName, data);

    const programTitle = programSongs[0].program_title;
    const programStart = programSongs[0].program_start;
    const programEnd = programSongs[0].program_end;
    const { host } = programSongs[0];

    setProgramDetails({ programTitle, programStart, programEnd, host });
  }

  function onProgramSelect(e) {
    const programName = document.querySelector('#radio-shows').value;

    const programSongs = filterAndMakeReadWriteCopy(programName, data);
    dispatch(isShowDisplayVisibleUpdate(false));

    // TODO: have temporary condition to only fetch these things once I'm further down the line, I have dummy data to start formatting

    if (environment === 'dev') {
      console.log(JSON.stringify(programSongs));
      dispatch(populateTracks(programSongs));
    } else {
      // there are a lot of tracks in the KCRW api that don't have an existing spotify id -
      // make an initial request to spotify api to see if the songs are available
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
              .catch((err) =>
                console.log(
                  'there was an error in requesting track info from spotify API. Message: ',
                  err
                )
              )
          );
        }
      }

      Promise.all(fetches).then(() => {
        console.log('programSongs after all promises resolved: ', programSongs);
        dispatch(populateTracks(programSongs));
      });
    }
  }

  // parse through data that came back from kcrw api and create a program list from the array
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
      <div className={styles.showDisplay}>
        <h2>SELECT A KCRW DJ/SHOW</h2>
        <DateSelector setStartDate={setStartDate} startDate={startDate} setSkip={setSkip} />
        <form>
          <label htmlFor="radio-shows">Program </label>
          <select id="radio-shows" onChange={onProgramChange}>
            <option value="" hidden>
              Choose a program
            </option>
            {programNames}
          </select>
        </form>
        {programDetails && (
          <>
            <ProgramDetailsDisplay programDetails={programDetails} date={startDate} />
            <button
              className={styles.showDisplayButton}
              type="button"
              onClick={(e) => {
                onProgramSelect(e);
              }}
            >
              Search
            </button>
          </>
        )}
      </div>
    );
  }

  return (
    <div className={styles.showDisplay}>
      <h2>SELECT A KCRW DJ/SHOW</h2>
      <DateSelector setStartDate={setStartDate} startDate={startDate} setSkip={setSkip} />
    </div>
  );
}

export default ShowDisplay;
