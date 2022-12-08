import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { isLoggedInUpdate, spotifyPlaylistNameUpdate } from '../../store/reducers/displayReducer';

import SpotifyLogo from '../../../assets/images/Spotify_Logo_RGB_Green.png';
import SpotifyIconWhite from '../../../assets/images/Spotify_Icon_RGB_White.png';
import SpotifyIconBlack from '../../../assets/images/Spotify_Icon_RGB_Black.png';

import styles from './spotifyContainer.styles.scss';
import configData from '../../../config.json';

function SpotifyContainer({ playlistTitle, playlistDate, populatedTracks }) {
  const [buttonText, setButtonText] = useState('Create Playlist');
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const dispatch = useDispatch();

  const spotifyPlaylistName = useSelector((state) => state.display.spotifyPlaylistName);
  const isLoggedIn = useSelector((state) => state.display.isLoggedIn);

  const onLoginClick = () => {
    window.open(`${configData.REACT_APP_SERVER_URL}spotify`, '_blank');
  };

  const onLogoutClick = () => {
    localStorage.clear();
    dispatch(isLoggedInUpdate(false));
    fetch(`${configData.REACT_APP_SERVER_URL}logout`)
      .then((res) => res.json())
      .then((data) => data);
  };

  const onPlaylistClick = () => {
    setButtonText('Loading...');
    setButtonDisabled(true);
    const songURIArray = [];
    populatedTracks.forEach((song) => {
      songURIArray.push(`spotify:track:${song.spotify_id}`);
    });

    const filteredURIArray = songURIArray.filter((el) => el !== 'spotify:track:null');

    const body = {
      songURIArray: filteredURIArray,
      showTitle: spotifyPlaylistName,
      showDate: playlistDate,
    };

    fetch(`${configData.REACT_APP_SERVER_URL}playlist`, {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON',
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => {
        setButtonText('Success!');
        setTimeout(() => {
          setButtonDisabled(false);
          setButtonText('Create Playlist');
        }, 1000);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  return (
    <div className={styles.playlistTitle}>
      <img src={SpotifyLogo} alt="spotify-logo-green" className={styles.spotifyLogo} />
      {!isLoggedIn && (
        <p>
          <span>Love this Playlist?</span> Link your Spotify account and save this playlist so you
          can listen anytime!
        </p>
      )}
      <label htmlFor="playlistTitle">
        <input
          type="text"
          id="playlistTitle"
          name="playlistTitle"
          value={spotifyPlaylistName}
          onChange={(e) => {
            dispatch(spotifyPlaylistNameUpdate(e.target.value));
          }}
        />
        Playlist Name
      </label>
      {!isLoggedIn ? (
        <button type="button" onClick={onLoginClick} className={styles.spotifyLoginButton}>
          <img src={SpotifyIconWhite} alt="white spotify icon" className={styles.spotifyIcon} />
          Login
        </button>
      ) : (
        <div className={styles.playlistAndLogout}>
          <button
            type="button"
            className={styles.createPlaylistButton}
            onClick={onPlaylistClick}
            disabled={buttonDisabled}
          >
            {buttonText}
          </button>
          <button type="button" className={styles.spotifyLogoutButton} onClick={onLogoutClick}>
            <img src={SpotifyIconBlack} alt="black spotify icon" className={styles.spotifyIcon} />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default SpotifyContainer;
