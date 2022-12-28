import React from 'react';
import PropTypes from 'prop-types';

import TrackContainer from '../trackContainer/trackContainer';

import styles from './trackDisplay.styles.scss';

function TrackDisplay({ spotifyTrackList, setLoadMoreTracks, loadMoreTracks }) {
  const trackDisplayData = spotifyTrackList.map((track, i) => (
    <div
      className={`${styles.trackContainer} ${
        track.available && track.include ? null : styles.unavailable
      }`}
      key={`div-${track.playId}`}
    >
      <TrackContainer
        key={track.playId}
        index={i}
        title={track.title}
        artist={track.artist}
        album={track.album}
        available={track.available}
        include={track.include}
      />
    </div>
  ));

  const initialDisplayData = trackDisplayData.slice(0, 11);
  const requestMoreDisplayData = trackDisplayData.slice(11);

  return (
    <>
      <div className={styles.trackDisplay}>
        <p>No.</p>
        <p>Title | Artists</p>
        <p>Album</p>
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
    </>
  );
}

TrackDisplay.propTypes = {
  spotifyTrackList: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TrackDisplay;
