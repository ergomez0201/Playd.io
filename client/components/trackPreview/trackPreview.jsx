import React from 'react';
import { MdPlayCircleFilled } from 'react-icons/md';

function TrackPreview({ available }) {
  return available ? <MdPlayCircleFilled fontSize="2rem" color="#005A9C" /> : <p>Unavailable</p>;
}

export default TrackPreview;
