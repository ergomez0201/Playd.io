import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import configData from '../../../config.json';
import PlaylistHeader from '../playlistHeader/playlistHeader';
import TrackDisplay from '../trackDisplay/trackDisplay';

import { isLoggedInUpdate } from '../../store/reducers/displayReducer';

import styles from './mainContainer.styles.scss';
import { monthMapperNumber } from '../utils/dateParser/monthMapper';

function MainContainer({ spotifyTrackList }) {
  const dispatch = useDispatch();

  let playlistTitle;
  let playlistDate;

  if (spotifyTrackList) {
    playlistTitle = spotifyTrackList[0].programTitle;
    const [year, month, day] = spotifyTrackList[0].date.split('-');
    playlistDate = `${monthMapperNumber[month]} ${day}, ${year}`;
    console.log('this is the playlistDate: ', playlistDate);
  }

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
      {spotifyTrackList && playlistTitle && playlistDate && (
        <>
          <PlaylistHeader
            playlistTitle={playlistTitle}
            playlistDate={playlistDate}
            spotifyTrackList={spotifyTrackList}
          />
          <TrackDisplay spotifyTrackList={spotifyTrackList} />
        </>
      )}
    </div>
  );
}

async function checkLogin() {
  const userID = localStorage.getItem('userID');
  if (!userID) return false;

  const res = await fetch(`${configData.REACT_APP_SERVER_URL}/login?userID=${userID}`);
  const data = await res.json();
  return data;
}

export default MainContainer;
