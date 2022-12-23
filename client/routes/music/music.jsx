import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useSelector } from 'react-redux';

import ShowDisplay from '../../components/showDisplay/showDisplay';
import MainContainer from '../../components/mainContainer/mainContainer';

import './music.styles.scss';

function Music() {
  const [fullTrackList, setFullTrackList] = useState(null);
  const isShowDisplayVisible = useSelector((state) => state.display.isShowDisplayVisible);
  const isMobileOrTablet = useMediaQuery({ query: '(max-width: 768px)' });

  let containerToRender;
  console.log('this is the fullTrackList: ', fullTrackList);

  if (isShowDisplayVisible) {
    containerToRender = (
      <ShowDisplay setFullTrackList={setFullTrackList} fullTrackList={fullTrackList} />
    );
  } else {
    containerToRender = <MainContainer fullTrackList={fullTrackList} />;
  }

  return (
    <main>
      {isMobileOrTablet ? (
        containerToRender
      ) : (
        <>
          <ShowDisplay setFullTrackList={setFullTrackList} fullTrackList={fullTrackList} />
          <MainContainer fullTrackList={fullTrackList} />
        </>
      )}
    </main>
  );
}

export default Music;
