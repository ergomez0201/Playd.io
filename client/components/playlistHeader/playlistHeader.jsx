import React from 'react';

import SpotifyContainer from '../spotifyContainer/spotifyContainer';

import './playlistHeader.styles.scss';

function PlaylistHeader({ playlistTitle, playlistDate, spotifyTrackList }) {
  return (
    <>
      <header>
        <h2>{playlistTitle}</h2>
        <p>{playlistDate}</p>
      </header>
      {playlistTitle && playlistDate && (
        <SpotifyContainer
          playlistTitle={playlistTitle}
          playlistDate={playlistDate}
          spotifyTrackList={spotifyTrackList}
        />
      )}
    </>
  );
}

export default PlaylistHeader;
