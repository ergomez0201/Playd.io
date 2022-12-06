import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { isShowDisplayVisibleUpdate, dateUpdate } from '../../store/reducers/displayReducer';
import { populateTracks, setLoadMoreTracks } from '../../store/reducers/tracksReducer';
import { useGetKcrwDataQuery } from '../../features/api/apiSlice';

import DateSelector from '../dateSelector/dateSelector';
import ProgramDetailsDisplay from '../programDetailsDisplay/programDetailsDisplay';
import { dateToStringYMD } from '../utils/dateParser/dateParser';
import filterAndMakeReadWriteCopy from '../utils/dataCopy/filterAndMakeReadWriteCopy';
import monthMapper from '../utils/dateParser/monthMapper';

import styles from './showDisplay.styles.scss';
import ProgramSelectForm from '../programSelectForm/programSelectForm';

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

  const { data } = useGetKcrwDataQuery(
    { year: stringYear, month: stringMonth, day: stringDay },
    {
      skip,
    }
  );
  console.log('this is the data back from kcrw api: ', data);

  function onProgramSelect() {
    const [dayOfWeek, month, day, year] = startDate.toString().split(' ');
    dispatch(dateUpdate(`${monthMapper[month]} ${day}, ${year}`));

    const programName = programDetails.programTitle;
    const programSongs = filterAndMakeReadWriteCopy(programName, data);
    dispatch(isShowDisplayVisibleUpdate(false));

    // TODO: have temporary condition to only fetch these things once I'm further down the line, I have dummy data to start formatting

    if (environment === 'dev') {
      console.log(JSON.stringify(programSongs));
      dispatch(populateTracks(programSongs));
    } else {
      // there are a lot of tracks in the KCRW api that don't have an existing spotify id -
      // make an initial request to spotify api to see if the songs are available
      const missingDataArr = fetchMissingIds(programSongs);
      Promise.all(missingDataArr).then(() => {
        dispatch(populateTracks(programSongs));
      });
    }
  }

  // parse through data that came back from kcrw api and create a program list from the array
  const programNameSet = new Set();
  let programNames;

  if (data) {
    data.forEach((program) => programNameSet.add(program.program_title));
    programNames = [...programNameSet].map((program) => (
      <option key={program} value={program}>
        {program}
      </option>
    ));
    console.log('program names: ', programNames);
  }

  return (
    <div className={styles.showDisplay}>
      <h2>SELECT A KCRW DJ/SHOW</h2>
      <DateSelector setStartDate={setStartDate} startDate={startDate} setSkip={setSkip} />
      {data && (
        <ProgramSelectForm
          data={data}
          setProgramDetails={setProgramDetails}
          programNames={programNames}
        />
      )}
      {programDetails && (
        <>
          <ProgramDetailsDisplay programDetails={programDetails} date={startDate} />
          <button
            className={styles.showDisplayButton}
            type="button"
            onClick={() => {
              onProgramSelect();
              dispatch(setLoadMoreTracks(false));
            }}
          >
            Search
          </button>
        </>
      )}
    </div>
  );
}

function fetchMissingIds(programSongs) {
  const fetches = [];
  for (let i = 0; i < programSongs.length; i++) {
    if (programSongs[i].spotify_id === null) {
      fetches.push(
        fetch(`/api/search?title=${programSongs[i].title}&artist=${programSongs[i].artist}`)
          .then((res) => res.json())
          .then((url) => {
            const { spotifyUri, albumImage, albumImageLarge } = url;
            if (spotifyUri) {
              const uriString = spotifyUri.split(':')[2];
              programSongs[i].spotify_id = uriString;
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

  return fetches;
}

export default ShowDisplay;
