import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import PlaylistHeader from '../playlistHeader/playlistHeader';
import TrackDisplay from '../trackDisplay/trackDisplay';

import {
  playlistTitleUpdate,
  spotifyPlaylistNameUpdate,
} from '../../store/reducers/displayReducer';

import styles from './mainContainer.styles.scss';

function MainContainer() {
  const dispatch = useDispatch();
  const populatedTracks = useSelector((state) => state.tracks.tracks);
  const playlistTitle = useSelector((state) => state.display.playlistTitle);
  const stringDate = useSelector((state) => state.display.date);
  const playlistDate = useSelector((state) => state.display.date);

  console.log('this is the stringdate from redux: ', stringDate);
  console.log('this is the populated tracks in mainContainer component: ', populatedTracks);
  console.log('this is the playlistTitle in redux: ', playlistTitle);

  useEffect(() => {
    if (populatedTracks) {
      const programTitle = populatedTracks[0].program_title;
      dispatch(playlistTitleUpdate(programTitle));
      dispatch(spotifyPlaylistNameUpdate(`${programTitle} - ${playlistDate}`));
    }
  }, [populatedTracks, playlistTitle]);

  useEffect(() => {
    fetch('/api/login')
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, []);
  return (
    <div className={styles.mainContainer}>
      {populatedTracks && playlistTitle && playlistDate && (
        <>
          <PlaylistHeader playlistTitle={playlistTitle} playlistDate={playlistDate} />
          <TrackDisplay populatedTracks={populatedTracks} />
        </>
      )}
    </div>
  );
}

export default MainContainer;
