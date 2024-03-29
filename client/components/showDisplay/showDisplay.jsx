import React, { useState } from 'react';

import DateSelector from '../dateSelector/dateSelector';
import ProgramDetailsDisplay from '../programDetailsDisplay/programDetailsDisplay';
import { fetchMissingIds } from '../utils/api/api';

import styles from './showDisplay.styles.scss';
import ProgramSelectForm from '../programSelectForm/programSelectForm';

function ShowDisplay(props) {
  const {
    setFullTrackList,
    fullTrackList,
    currentTrackList,
    setSpotifyTrackList,
    setCurrentTrackList,
    startDate,
    setStartDate,
    programDetails,
    setProgramDetails,
    setShowDisplayVisible,
    setLoadMoreTracks,
  } = props;
  // temporary environment variable for development
  const environment = 'prod';

  const [buttonText, setButtonText] = useState('Search');

  function onProgramSelect() {
    setButtonText('Loading...');
    const programSongs = [...currentTrackList];

    if (environment === 'dev') {
      for (let i = 0; i < programSongs.length; i++) {
        const available = !!programSongs[i].spotifyId;
        programSongs[i].available = available;
        programSongs[i].include = available;
      }
      setCurrentTrackList(programSongs);
      setSpotifyTrackList(programSongs);
      setShowDisplayVisible(false);
      setButtonText('Search');
      setLoadMoreTracks(false);
    } else {
      // there are a lot of tracks in the KCRW api that don't have an existing spotify id -
      // make an initial request to spotify api to see if the songs are available
      const missingDataArr = fetchMissingIds(programSongs);
      Promise.all(missingDataArr).then(() => {
        for (let i = 0; i < programSongs.length; i++) {
          const available = !!programSongs[i].spotifyId;
          programSongs[i].available = available;
          programSongs[i].include = available;
        }
        setCurrentTrackList(programSongs);
        setSpotifyTrackList(programSongs);
        setShowDisplayVisible(false);
        setButtonText('Search');
        setLoadMoreTracks(false);
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
        setProgramDetails={setProgramDetails}
      />
      {fullTrackList && (
        <ProgramSelectForm
          setCurrentTrackList={setCurrentTrackList}
          fullTrackList={fullTrackList}
          setProgramDetails={setProgramDetails}
          programNames={programNames}
        />
      )}
      {programDetails && (
        <>
          <ProgramDetailsDisplay programDetails={programDetails} date={startDate} />
          <button className={styles.showDisplayButton} type="button" onClick={onProgramSelect}>
            {buttonText}
          </button>
        </>
      )}
    </div>
  );
}

export default ShowDisplay;
