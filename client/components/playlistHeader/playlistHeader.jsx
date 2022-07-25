import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { playlistTitleUpdate } from '../../store/reducers/displayReducer';

function PlaylistHeader() {
  const playlistTitle = useSelector((state) => state.display.playlistTitle);
  const dispatch = useDispatch();
  return (
    <div>
      <p>This is the PlaylistHeader</p>
      <label htmlFor="playlistTitle">
        Playlist Title:
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
    </div>
  );
}

export default PlaylistHeader;
