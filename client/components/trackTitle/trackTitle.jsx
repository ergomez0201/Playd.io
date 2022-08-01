import React from 'react';

import styles from './trackTitle.styles.scss';

function TrackTitle(props) {
  const { title } = props;
  return <p className={styles.trackTitle}>{title}</p>;
}

export default TrackTitle;
