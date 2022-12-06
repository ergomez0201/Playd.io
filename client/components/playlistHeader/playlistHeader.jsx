import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { playlistTitleUpdate } from '../../store/reducers/displayReducer';

import SpotifyContainer from '../spotifyContainer/spotifyContainer';

import styles from './playlistHeader.styles.scss';

function PlaylistHeader() {
  const playlistTitle = useSelector((state) => state.display.playlistTitle);
  const playlistDate = useSelector((state) => state.display.date);
  const dispatch = useDispatch();
  return (
    <>
      <header>
        <h2>{playlistTitle}</h2>
        <p>{playlistDate}</p>
      </header>
      <SpotifyContainer />
      <label htmlFor="playlistTitle" className={styles.playlistTitle}>
        <p>PLAYLIST TITLE:</p>
        <input
          type="text"
          id="playlistTitle"
          name="playlistTitle"
          defaultValue={playlistTitle}
          onChange={(e) => {
            dispatch(playlistTitleUpdate(e.target.value));
          }}
        />
      </label>
    </>
  );
}

export default PlaylistHeader;
