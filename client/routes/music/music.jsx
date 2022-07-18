import React from 'react';

import ShowDisplay from '../../components/showDisplay/showDisplay';
import MainContainer from '../../components/mainContainer/mainContainer';

import styles from './music.styles.scss';

function Music() {
  return (
    <main>
      <div className={styles.showDisplay}>
        <ShowDisplay />
      </div>
      <div className={styles.mainContainer}>
        <MainContainer />
      </div>
    </main>
  );
}

export default Music;
