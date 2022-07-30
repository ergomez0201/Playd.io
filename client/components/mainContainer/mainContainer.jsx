import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import PlaylistHeader from '../playlistHeader/playlistHeader';
import TrackDisplay from '../trackDisplay/trackDisplay';

import { playlistTitleUpdate } from '../../store/reducers/displayReducer';

import styles from './mainContainer.styles.scss';

function MainContainer() {
  const dispatch = useDispatch();
  const populatedTracks = useSelector((state) => state.tracks.tracks);
  const playlistTitle = useSelector((state) => state.display.playlistTitle);
  console.log('this is the populated tracks in mainContainer component: ', populatedTracks);
  console.log('this is the playlistTitle in redux: ', playlistTitle);

  useEffect(() => {
    if (populatedTracks) {
      const programDate = populatedTracks[0].date;
      const programTitle = populatedTracks[0].program_title;
      dispatch(playlistTitleUpdate(`${programTitle}: ${programDate}`));
    }
  }, [populatedTracks]);

  const onLoginClick = () => {
    // move this logic into playlistHeader component
    window.open('http://localhost:8080/api/spotify', '_blank');
  };
  return (
    <div className={styles.mainContainer}>
      <div>This is the Main Container</div>
      <button type="button" onClick={onLoginClick}>
        Spotify
      </button>
      {populatedTracks && (
        <div>
          <PlaylistHeader />
          <TrackDisplay populatedTracks={populatedTracks} />
        </div>
      )}
    </div>
  );
}

export default MainContainer;
