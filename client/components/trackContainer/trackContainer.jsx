import React from 'react';

import TrackNumber from '../trackNumber/trackNumber';
import TrackImage from '../trackImage/trackImage';
import TrackTitle from '../trackTitle/trackTitle';
import TrackAlbum from '../trackAlbum/trackAlbum';

import styles from './trackContainer.styles.scss';

function TrackContainer(props) {
  const { index, albumImage, title, album } = props;
  return (
    <div className={styles.trackContainer}>
      <TrackNumber index={index} />
      <TrackImage albumImage={albumImage} />
      <TrackTitle title={title} />
      <TrackAlbum album={album} />
    </div>
  );
}

export default TrackContainer;
