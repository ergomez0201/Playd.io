import React from 'react';

import PlaylistHeader from '../playlistHeader/playlistHeader';
import TrackDisplay from '../trackDisplay/trackDisplay';

import styles from './mainContainer.styles.scss';
import { monthMapperNumber } from '../utils/dateParser/monthMapper';
import useAuth from '../utils/hooks/hooks';

function MainContainer({ spotifyTrackList, setLoadMoreTracks, loadMoreTracks }) {
  const [isLoggedIn, setIsLoggedIn] = useAuth();

  console.log('isLoggedIn from custom hook: ', isLoggedIn);

  let playlistTitle;
  let playlistDate;

  if (spotifyTrackList) {
    playlistTitle = spotifyTrackList[0].programTitle;
    const [year, month, day] = spotifyTrackList[0].date.split('-');
    playlistDate = `${monthMapperNumber[month]} ${day}, ${year}`;
    console.log('this is the playlistDate: ', playlistDate);
  }

  return (
    <div className={styles.mainContainer}>
      {spotifyTrackList && playlistTitle && playlistDate && isLoggedIn !== null && (
        <>
          <PlaylistHeader
            playlistTitle={playlistTitle}
            playlistDate={playlistDate}
            spotifyTrackList={spotifyTrackList}
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
          />
          <TrackDisplay
            spotifyTrackList={spotifyTrackList}
            setLoadMoreTracks={setLoadMoreTracks}
            loadMoreTracks={loadMoreTracks}
          />
        </>
      )}
    </div>
  );
}

export default MainContainer;
