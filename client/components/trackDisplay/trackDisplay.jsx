import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ReactHowler from 'react-howler';

import TrackContainer from '../trackContainer/trackContainer';

import styles from './trackDisplay.styles.scss';

function TrackDisplay({
  spotifyTrackList,
  setSpotifyTracklist,
  setLoadMoreTracks,
  loadMoreTracks,
}) {
  const [activeSong, setActiveSong] = useState(['']);
  const [howlerPlay, setHowlerPlay] = useState(false);

  console.log('spotifyTrackList: ', spotifyTrackList);
  console.log('activeSong: ', activeSong);
  console.log('howlerPlay: ', howlerPlay);

  const trackDisplayData = spotifyTrackList.map((track, i) => (
    <TrackContainer
      key={track.playId}
      index={i}
      title={track.title}
      artist={track.artist}
      album={track.album}
      available={track.available}
      include={track.include}
      spotifyId={track.spotifyId}
      spotifyPreview={track.spotifyPreview}
      spotifyTrackList={spotifyTrackList}
      setSpotifyTracklist={setSpotifyTracklist}
      setActiveSong={setActiveSong}
      setHowlerPlay={setHowlerPlay}
    />
  ));

  const initialDisplayData = trackDisplayData.slice(0, 11);
  const requestMoreDisplayData = trackDisplayData.slice(11);

  return (
    <>
      <div className={styles.trackDisplay}>
        <p>No.</p>
        <p>Title | Artists</p>
        <p>Album</p>
        <p>Preview</p>
      </div>
      {initialDisplayData}
      {!loadMoreTracks && (
        <button
          className={styles.loadMoreButton}
          type="button"
          onClick={() => {
            setLoadMoreTracks(true);
          }}
        >
          LOAD MORE
        </button>
      )}
      {loadMoreTracks && requestMoreDisplayData}
      <ReactHowler playing={howlerPlay} src={activeSong} format={['mp3']} />
    </>
  );
}

TrackDisplay.propTypes = {
  spotifyTrackList: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TrackDisplay;
