import React from 'react';

import TrackNumber from '../trackNumber/trackNumber';
import TrackImage from '../trackImage/trackImage';
import TrackTitle from '../trackTitle/trackTitle';
import TrackAlbum from '../trackAlbum/trackAlbum';

import styles from './trackContainer.styles.scss';

function TrackContainer(props) {
  const { index, albumImage, title, album } = props;
  return (
    <>
      <td>
        <TrackNumber index={index} />
      </td>
      <td className={styles.imageAndTitle}>
        <TrackImage albumImage={albumImage} />
        <TrackTitle title={title} />
      </td>
      <td>
        <TrackAlbum album={album} />
      </td>
    </>
  );
}

export default TrackContainer;
