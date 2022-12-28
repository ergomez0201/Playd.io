import React from 'react';
import PropTypes from 'prop-types';

import TrackContainer from '../trackContainer/trackContainer';

import styles from './trackDisplay.styles.scss';

function TrackDisplay({
  spotifyTrackList,
  setSpotifyTracklist,
  setLoadMoreTracks,
  loadMoreTracks,
}) {
  console.log('spotifyTrackList: ', spotifyTrackList);

  const trackDisplayData = spotifyTrackList.map((track, i) => (
    <div className={`${track.available ? null : styles.unavailable}`} key={`div-${track.playId}`}>
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
        setSpotifyTracklist={setSpotifyTracklist}
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
    </>
  );
}

TrackDisplay.propTypes = {
  spotifyTrackList: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TrackDisplay;
