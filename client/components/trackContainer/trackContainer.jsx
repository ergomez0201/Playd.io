import React from 'react';
import PropTypes from 'prop-types';

import TrackNumber from '../trackNumber/trackNumber';
// import TrackImage from '../trackImage/trackImage';
import TrackTitle from '../trackTitle/trackTitle';
import TrackAlbum from '../trackAlbum/trackAlbum';
import TrackArtist from '../trackArtist/trackArtist';

import styles from './trackContainer.styles.scss';

function TrackContainer({ index, title, album, artist }) {
  return (
    <>
      <TrackNumber index={index} />
      <div className={styles.titleAndArtist}>
        <TrackTitle title={title} />
        <TrackArtist artist={artist} />
      </div>
      <TrackAlbum album={album} />
    </>
  );
}

TrackContainer.propTypes = {
  index: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  album: PropTypes.string.isRequired,
  artist: PropTypes.string.isRequired,
};

export default TrackContainer;
