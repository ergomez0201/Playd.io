import React from 'react';
import { useMediaQuery } from 'react-responsive';

import ShowDisplay from '../../components/showDisplay/showDisplay';
import MainContainer from '../../components/mainContainer/mainContainer';

import styles from './music.styles.scss';

function Music() {
  const isMobileOrTablet = useMediaQuery({ query: '(max-width: 768px)' });
  const isLaptopOrDesktop = useMediaQuery({ query: '(min-width: 768px)' });

  return (
    <main>
      {isMobileOrTablet && (
        <div className={styles.showDisplay}>
          <ShowDisplay />
        </div>
      )}
      {isLaptopOrDesktop && (
        <>
          <div className={styles.showDisplay}>
            <ShowDisplay />
          </div>
          <div className={styles.mainContainer}>
            <MainContainer />
          </div>
        </>
      )}
    </main>
  );
}

export default Music;
