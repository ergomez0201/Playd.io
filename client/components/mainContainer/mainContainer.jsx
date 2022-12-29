import React from 'react';

import { MdArrowBack } from 'react-icons/md';

import PlaylistHeader from '../playlistHeader/playlistHeader';
import TrackDisplay from '../trackDisplay/trackDisplay';

import styles from './mainContainer.styles.scss';
import { monthMapperNumber } from '../utils/dateParser/monthMapper';
import useAuth from '../utils/hooks/hooks';

function MainContainer({
  spotifyTrackList,
  setSpotifyTracklist,
  setLoadMoreTracks,
  loadMoreTracks,
  isMobileOrTablet,
  setShowDisplayVisible,
}) {
  const [isLoggedIn, setIsLoggedIn] = useAuth();

  let playlistTitle;
  let playlistDate;

  if (spotifyTrackList) {
    playlistTitle = spotifyTrackList[0].programTitle;
    const [year, month, day] = spotifyTrackList[0].date.split('-');
    playlistDate = `${monthMapperNumber[month]} ${day}, ${year}`;
  }

  return (
    <div className={styles.mainContainer}>
      {playlistDate && isLoggedIn !== null && (
        <>
          {isMobileOrTablet && (
            <button
              className={styles.backArrow}
              type="button"
              onClick={() => {
                setShowDisplayVisible(true);
                setLoadMoreTracks(false);
              }}
            >
              <MdArrowBack />
              BACK
            </button>
          )}
          <PlaylistHeader
            playlistTitle={playlistTitle}
            playlistDate={playlistDate}
            spotifyTrackList={spotifyTrackList}
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
          />
          <TrackDisplay
            spotifyTrackList={spotifyTrackList}
            setSpotifyTracklist={setSpotifyTracklist}
            setLoadMoreTracks={setLoadMoreTracks}
            loadMoreTracks={loadMoreTracks}
          />
        </>
      )}
    </div>
  );
}

export default MainContainer;
