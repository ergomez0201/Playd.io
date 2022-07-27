import React from 'react';
import { useSelector } from 'react-redux';
import { populateTracks } from '../../store/reducers/tracksReducer';

import TrackContainer from '../trackContainer/trackContainer';

function TrackDisplay(props) {
  const { populatedTracks } = props;

  const totalTracks = useSelector((state) => state.tracks.tracks);
  console.log('totalTracks in trackDisplay component: ', totalTracks);
  const trackDisplayData = populatedTracks.map((track, i) => (
    <TrackContainer
      key={track.play_id}
      index={i}
      albumImage={track.albumImage}
      title={track.title}
      album={track.album}
    />
  ));
  return (
    <div>
      <p>This is the TrackDisplay</p>
      {trackDisplayData}
    </div>
  );
}

export default TrackDisplay;
