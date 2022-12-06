import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { useSelector } from 'react-redux';

import ShowDisplay from '../../components/showDisplay/showDisplay';
import MainContainer from '../../components/mainContainer/mainContainer';

import './music.styles.scss';

function Music() {
  const isShowDisplayVisible = useSelector((state) => state.display.isShowDisplayVisible);
  const isMobileOrTablet = useMediaQuery({ query: '(max-width: 768px)' });

  let containerToRender;

  if (isShowDisplayVisible) {
    containerToRender = <ShowDisplay />;
  } else {
    containerToRender = <MainContainer />;
  }

  return (
    <main>
      {isMobileOrTablet ? (
        containerToRender
      ) : (
        <>
          <ShowDisplay />
          <MainContainer />
        </>
      )}
    </main>
  );
}

export default Music;
