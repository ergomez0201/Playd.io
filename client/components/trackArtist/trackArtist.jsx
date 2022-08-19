import React from 'react';
import PropTypes from 'prop-types';

import styles from './trackArtist.styles.scss';

function TrackArtist({ artist }) {
  return <p className={styles.trackArtist}>{artist}</p>;
}

TrackArtist.propTypes = {
  artist: PropTypes.string.isRequired,
};

export default TrackArtist;
