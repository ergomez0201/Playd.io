import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { populateTracks } from '../../store/reducers/tracksReducer';

import TrackContainer from '../trackContainer/trackContainer';

import styles from './trackDisplay.styles.scss';

function TrackDisplay({ populatedTracks }) {
  const [hasBeenRequested, setHasBeenRequested] = useState(false);

  const trackDisplayData = populatedTracks.map((track, i) => (
    <div className={styles.trackContainer}>
      <TrackContainer
        key={track.play_id}
        index={i}
        albumImage={track.albumImage}
        title={track.title}
        album={track.album}
      />
    </div>
  ));

  const initialDisplayData = trackDisplayData.slice(0, 11);
  const requestMoreDisplayData = trackDisplayData.slice(11);

  return (
    <>
      <div className={styles.trackDisplay}>
        <p>No.</p>
        <p>Title</p>
        <p>Album</p>
      </div>
      {initialDisplayData}
      {!hasBeenRequested && (
        <button
          className={styles.loadMoreButton}
          type="button"
          onClick={() => {
            setHasBeenRequested(true);
          }}
        >
          LOAD MORE
        </button>
      )}
      {hasBeenRequested && requestMoreDisplayData}
    </>
  );
}

TrackDisplay.propTypes = {
  populatedTracks: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TrackDisplay;
