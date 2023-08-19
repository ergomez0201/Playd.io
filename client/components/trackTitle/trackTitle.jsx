import React from 'react';
import PropTypes from 'prop-types';

import styles from './trackTitle.styles.scss';

function TrackTitle({ title }) {
	return <p className={styles.trackTitle}>{title}</p>;
}

TrackTitle.propTypes = {
	title: PropTypes.string.isRequired,
};

export default TrackTitle;
