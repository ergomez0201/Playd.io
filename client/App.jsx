import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './routes/navbar/navbar';
import Music from './routes/music/music';
import Footer from './routes/footer/footer';

// styles and assets
import styles from './App.scss';

function App() {
  return (
    <div className={styles.pageContainer}>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Music />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
