import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  playlistTitleUpdate,
  spotifyPlaylistNameUpdate,
} from '../../store/reducers/displayReducer';

import SpotifyLogo from '../../../assets/images/Spotify_Logo_RGB_Green.png';

import styles from './spotifyContainer.styles.scss';

function SpotifyContainer({ playlistTitle, playlistDate }) {
  // TODO: Spotify container needs to keep track of auth information to display the correct message
  const dispatch = useDispatch();

  const spotifyPlaylistName = useSelector((state) => state.display.spotifyPlaylistName);
  console.log('this is the spotify playlist name: ', spotifyPlaylistName);

  const onLoginClick = () => {
    window.open('/api/spotify', '_blank');
  };
  return (
    <div className={styles.playlistTitle}>
      <img src={SpotifyLogo} alt="spotify-logo-green" />
      <p>
        <span>Love this Playlist?</span> Link your Spotify account and save this playlist so you can
        listen anytime!
      </p>
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
      <button type="button" onClick={onLoginClick}>
        Spotify Log In
      </button>
    </div>
  );
}

export default SpotifyContainer;
