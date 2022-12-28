import React from 'react';

import SpotifyContainer from '../spotifyContainer/spotifyContainer';

import './playlistHeader.styles.scss';

function PlaylistHeader({
  playlistTitle,
  playlistDate,
  spotifyTrackList,
  isLoggedIn,
  setIsLoggedIn,
}) {
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
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
        />
      )}
    </>
  );
}

export default PlaylistHeader;
