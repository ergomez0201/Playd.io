import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';

import ShowDisplay from '../../components/showDisplay/showDisplay';
import MainContainer from '../../components/mainContainer/mainContainer';

import './music.styles.scss';

function Music() {
  const [fullTrackList, setFullTrackList] = useState(null);
  const [currentTrackList, setCurrentTrackList] = useState(null);
  const [spotifyTrackList, setSpotifyTrackList] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [programDetails, setProgramDetails] = useState(null);
  const [isShowDisplayVisible, setShowDisplayVisible] = useState(true);
  const [loadMoreTracks, setLoadMoreTracks] = useState(false);

  const isMobileOrTablet = useMediaQuery({ query: '(max-width: 768px)' });

  const showDisplayComponent = (
    <ShowDisplay
      setFullTrackList={setFullTrackList}
      fullTrackList={fullTrackList}
      currentTrackList={currentTrackList}
      setCurrentTrackList={setCurrentTrackList}
      setSpotifyTrackList={setSpotifyTrackList}
      startDate={startDate}
      setStartDate={setStartDate}
      programDetails={programDetails}
      setProgramDetails={setProgramDetails}
      setShowDisplayVisible={setShowDisplayVisible}
      setLoadMoreTracks={setLoadMoreTracks}
    />
  );

  const mainContainerComponent = (
    <MainContainer
      spotifyTrackList={spotifyTrackList}
      setSpotifyTracklist={setSpotifyTrackList}
      setShowDisplayVisible={setShowDisplayVisible}
      setLoadMoreTracks={setLoadMoreTracks}
      loadMoreTracks={loadMoreTracks}
      isMobileOrTablet={isMobileOrTablet}
    />
  );
  const containerToRender = isShowDisplayVisible
    ? showDisplayComponent
    : currentTrackList && mainContainerComponent;

  return (
    <main>
      {isMobileOrTablet ? (
        containerToRender
      ) : (
        <>
          {showDisplayComponent}
          {mainContainerComponent}
        </>
      )}
    </main>
  );
}

export default Music;
