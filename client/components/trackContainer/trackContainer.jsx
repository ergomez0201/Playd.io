import React from 'react';

import TrackNumber from '../trackNumber/trackNumber';
import TrackImage from '../trackImage/trackImage';
import TrackTitle from '../trackTitle/trackTitle';
import TrackAlbum from '../trackAlbum/trackAlbum';

function TrackContainer(props) {
  const { index, albumImage, title, album } = props;
  return (
    <>
      <TrackNumber index={index} />
      <TrackTitle title={title} />
      <TrackAlbum album={album} />
    </>
  );
}

export default TrackContainer;
