import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './routes/navbar/navbar';
import Music from './routes/music/music';
// import About from './routes/about/about';

// styles and assets
import './App.scss';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navbar />}>
        <Route index element={<Music />} />
        {/* <Route path="/about" element={<About />} /> */}
      </Route>
    </Routes>
  );
}

export default App;
