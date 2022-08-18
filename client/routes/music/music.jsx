import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useSelector } from 'react-redux';

import ShowDisplay from '../../components/showDisplay/showDisplay';
import MainContainer from '../../components/mainContainer/mainContainer';

import './music.styles.scss';

function Music() {
  const isShowDisplayVisible = useSelector((state) => state.display.isShowDisplayVisible);
  const isMobileOrTablet = useMediaQuery({ query: '(max-width: 768px)' });
  const isLaptopOrDesktop = useMediaQuery({ query: '(min-width: 768px)' });

  console.log('isShowDisplayVisible: ', isShowDisplayVisible);

  if (isMobileOrTablet && isShowDisplayVisible) {
    return (
      <main>
        <ShowDisplay />
      </main>
    );
  }
  if (isMobileOrTablet && !isShowDisplayVisible) {
    return (
      <main>
        <MainContainer />
      </main>
    );
  }

  return (
    <main>
      <ShowDisplay />
      <MainContainer />
    </main>
  );
}

export default Music;
