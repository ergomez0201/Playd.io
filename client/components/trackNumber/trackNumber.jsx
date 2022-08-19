import React from 'react';
import PropTypes from 'prop-types';

import styles from './trackNumber.styles.scss';

function TrackNumber({ index }) {
  return <p className={styles.trackNumber}>{index}</p>;
}

TrackNumber.propTypes = {
  index: PropTypes.number.isRequired,
};

export default TrackNumber;
