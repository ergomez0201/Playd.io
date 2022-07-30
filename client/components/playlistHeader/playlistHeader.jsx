import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { playlistTitleUpdate } from '../../store/reducers/displayReducer';

import styles from './playlistHeader.styles.scss';

function PlaylistHeader() {
  const playlistTitle = useSelector((state) => state.display.playlistTitle);
  const dispatch = useDispatch();
  return (
    <>
      <p>This is the PlaylistHeader</p>
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
