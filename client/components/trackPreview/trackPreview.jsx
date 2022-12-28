import React, { useState } from 'react';
import { MdPlayCircleFilled, MdStopCircle } from 'react-icons/md';

function TrackPreview({ available, spotifyPreview }) {
  const [playing, setPlaying] = useState(false);

  const setPlayState = (value) => {
    setPlaying(value);
  };

  const playerIcon = playing ? (
    <MdStopCircle fontSize="2rem" color="#005A9C" onClick={() => setPlayState(false)} />
  ) : (
    <MdPlayCircleFilled
      fontSize="2rem"
      color="#005A9C"
      onClick={() => {
        setPlayState(true);
      }}
    />
  );

  return available ? playerIcon : <p>Unavailable</p>;
}

export default TrackPreview;
