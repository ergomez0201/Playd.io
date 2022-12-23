import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { isShowDisplayVisibleUpdate, dateUpdate } from '../../store/reducers/displayReducer';
import { populateTracks, setLoadMoreTracks } from '../../store/reducers/tracksReducer';

import DateSelector from '../dateSelector/dateSelector';
import ProgramDetailsDisplay from '../programDetailsDisplay/programDetailsDisplay';
import filterAndMakeReadWriteCopy from '../utils/dataCopy/filterAndMakeReadWriteCopy';
import monthMapper from '../utils/dateParser/monthMapper';

import styles from './showDisplay.styles.scss';
import ProgramSelectForm from '../programSelectForm/programSelectForm';
import configData from '../../../config.json';

function ShowDisplay({ setFullTrackList, fullTrackList }) {
  // temporary environment variable for development
  const environment = 'prod';

  /*
    local state:
      startDate used to set date for DatePicker
      programDetails passed as a prop to programDetailsDisplay
      skip assures that the fetch for tracks doesn't happen until a date has been chosen
  */
  const [startDate, setStartDate] = useState(null);
  const [buttonText, setButtonText] = useState('Search');
  const [programDetails, setProgramDetails] = useState(null);

  const dispatch = useDispatch();

  function onProgramSelect() {
    const [dayOfWeek, month, day, year] = startDate.toString().split(' ');
    dispatch(dateUpdate(`${monthMapper[month]} ${day}, ${year}`));

    const programName = programDetails.programTitle;
    const programSongs = filterAndMakeReadWriteCopy(programName, fullTrackList);

    if (environment === 'dev') {
      for (let i = 0; i < programSongs.length; i++) {
        const available = !!programSongs[i].spotify_id;
        console.log('available after promise all: ', available);
        programSongs[i].available = available;
        programSongs[i].include = available;
      }
      dispatch(populateTracks(programSongs));
    } else {
      // there are a lot of tracks in the KCRW api that don't have an existing spotify id -
      // make an initial request to spotify api to see if the songs are available
      const missingDataArr = fetchMissingIds(programSongs);
      Promise.all(missingDataArr).then(() => {
        for (let i = 0; i < programSongs.length; i++) {
          const available = !!programSongs[i].spotify_id;
          programSongs[i].available = available;
          programSongs[i].include = available;
        }
        dispatch(populateTracks(programSongs));
        dispatch(isShowDisplayVisibleUpdate(false));
        setButtonText('Search');
      });
    }
  }

  // parse through data that came back from kcrw api and create a program list from the array
  const programNameSet = new Set();
  let programNames;

  if (fullTrackList) {
    fullTrackList.forEach((program) => programNameSet.add(program.program_title));
    programNames = [...programNameSet].map((program) => (
      <option key={program} value={program}>
        {program}
      </option>
    ));
  }

  return (
    <div className={styles.showDisplay}>
      <h2>SELECT A KCRW DJ/SHOW</h2>
      <DateSelector
        setStartDate={setStartDate}
        startDate={startDate}
        setFullTrackList={setFullTrackList}
      />
      {fullTrackList && (
        <ProgramSelectForm
          data={fullTrackList}
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
              setButtonText('Loading...');
              onProgramSelect();
              dispatch(setLoadMoreTracks(false));
            }}
          >
            {buttonText}
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
        fetch(
          `${configData.REACT_APP_SERVER_URL}search?title=${programSongs[i].title}&artist=${programSongs[i].artist}`
        )
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
