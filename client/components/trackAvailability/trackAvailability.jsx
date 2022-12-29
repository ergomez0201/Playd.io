import React from 'react';
import styles from './trackAvailability.styles.scss';

function TrackAvailability({ spotifyTrackList }) {
  const unavailableTrackCount = spotifyTrackList.filter((track) => !track.available).length;
  const includedTrackCount = spotifyTrackList.filter((track) => track.include).length;
  const totalTrackCount = spotifyTrackList.length;

  return (
    <div className={styles.trackAvailability}>
      <h3>TRACK AVAILABILITY</h3>
      <p>
        {unavailableTrackCount <= 1
          ? `${unavailableTrackCount} TRACK IS UNAVAILABLE`
          : `${unavailableTrackCount} TRACKS ARE UNAVAILABLE`}
      </p>
      <p>
        <span>
          {includedTrackCount} / {totalTrackCount - unavailableTrackCount}
        </span>{' '}
        AVAILABLE TRACKS SELECTED
      </p>
    </div>
  );
}

export default TrackAvailability;
