import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import PlaylistHeader from '../playlistHeader/playlistHeader';
import TrackDisplay from '../trackDisplay/trackDisplay';

import {
  playlistTitleUpdate,
  spotifyPlaylistNameUpdate,
  isLoggedInUpdate,
} from '../../store/reducers/displayReducer';

import styles from './mainContainer.styles.scss';

function MainContainer() {
  const dispatch = useDispatch();
  const populatedTracks = useSelector((state) => state.tracks.tracks);
  const playlistTitle = useSelector((state) => state.display.playlistTitle);
  const playlistDate = useSelector((state) => state.display.date);

  useEffect(() => {
    if (populatedTracks) {
      const programTitle = populatedTracks[0].program_title;
      dispatch(playlistTitleUpdate(programTitle));
      dispatch(spotifyPlaylistNameUpdate(`${programTitle} - ${playlistDate}`));
    }
  }, [populatedTracks, playlistTitle]);

  useEffect(() => {
    const checkAuth = async () => {
      const isAuth = await checkLogin();
      return isAuth;
    };

    checkAuth().then((isAuth) => {
      dispatch(isLoggedInUpdate(isAuth));
    });
  }, []);

  useEffect(() => {
    window.addEventListener('storage', (event) => {
      if (!event.storageArea.userID) {
        dispatch(isLoggedInUpdate(false));
      } else {
        checkLogin().then((isAuth) => {
          dispatch(isLoggedInUpdate(isAuth));
        });
      }
    });
  }, []);

  return (
    <div className={styles.mainContainer}>
      {populatedTracks && playlistTitle && playlistDate && (
        <>
          <PlaylistHeader
            playlistTitle={playlistTitle}
            playlistDate={playlistDate}
            populatedTracks={populatedTracks}
          />
          <TrackDisplay populatedTracks={populatedTracks} />
        </>
      )}
    </div>
  );
}

async function checkLogin() {
  const userID = localStorage.getItem('userID');
  if (!userID) return false;

  const res = await fetch(`/api/login?userID=${userID}`);
  const data = await res.json();
  return data;
}

export default MainContainer;
