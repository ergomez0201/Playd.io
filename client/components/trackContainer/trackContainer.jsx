import React from 'react';
import PropTypes from 'prop-types';

import TrackNumber from '../trackNumber/trackNumber';
import TrackTitle from '../trackTitle/trackTitle';
import TrackAlbum from '../trackAlbum/trackAlbum';
import TrackArtist from '../trackArtist/trackArtist';

import styles from './trackContainer.styles.scss';
import TrackPreview from '../trackPreview/trackPreview';

function TrackContainer({
  index,
  title,
  album,
  artist,
  available,
  include,
  spotifyId,
  spotifyPreview,
  spotifyTrackList,
  setSpotifyTracklist,
  activeSong,
  setActiveSong,
  setHowlerPlay,
}) {
  const handleIncludeClick = (e, idx) => {
    const trackListCopy = [...spotifyTrackList];
    const trackObject = { ...trackListCopy[idx], include: !include };
    trackListCopy[idx] = trackObject;
    setSpotifyTracklist(trackListCopy);
  };

  const handlePreviewClick = () => {
    console.log('spotifyPreview: ', spotifyPreview);
    if (activeSong[0] === spotifyPreview) {
      setActiveSong(['']);
      setHowlerPlay(false);
      return;
    }
    setActiveSong([spotifyPreview]);
    setHowlerPlay(true);
  };

  return (
    <div className={`${styles.trackContainer} ${available && !include ? styles.exclude : null}`}>
      <button
        type="button"
        disabled={!available}
        className={styles.buttonContainer}
        onClick={(e) => handleIncludeClick(e, index)}
      >
        <TrackNumber index={index + 1} />
        <div className={styles.titleAndArtist}>
          <TrackTitle title={title} />
          <TrackArtist artist={artist} />
        </div>
        <TrackAlbum album={album} />
      </button>
      <button
        type="button"
        disabled={!available}
        className={styles.previewButton}
        onClick={() => handlePreviewClick()}
      >
        <TrackPreview
          available={available}
          spotifyPreview={spotifyPreview}
          activeSong={activeSong}
        />
      </button>
    </div>
  );
}

TrackContainer.propTypes = {
  index: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  album: PropTypes.string.isRequired,
  artist: PropTypes.string.isRequired,
};

export default TrackContainer;
