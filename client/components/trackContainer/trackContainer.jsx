import React, { Fragment } from 'react';
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
  setSpotifyTracklist,
}) {
  const handleIncludeClick = (e, index) => {
    console.log('event: ', e);
    console.log('index: ', index);
  };

  return (
    <button
      type="button"
      disabled={!available}
      className={styles.trackContainer}
      onClick={(e) => handleIncludeClick(e, index)}
    >
      <TrackNumber index={index + 1} />
      <div className={styles.titleAndArtist}>
        <TrackTitle title={title} />
        <TrackArtist artist={artist} />
      </div>
      <TrackAlbum album={album} />
      <TrackPreview available={available} />
    </button>
  );
}

TrackContainer.propTypes = {
  index: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  album: PropTypes.string.isRequired,
  artist: PropTypes.string.isRequired,
};

export default TrackContainer;
