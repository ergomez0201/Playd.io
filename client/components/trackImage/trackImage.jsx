import React from 'react';
import defaultArtwork from '../../../assets/images/defaultTrackImage.jpg';

function TrackImage(props) {
  let { albumImage } = props;
  if (!albumImage) {
    albumImage = defaultArtwork;
  }
  return <img src={albumImage} alt="Album Artwork" width="60" height="60" />;
}

export default TrackImage;
