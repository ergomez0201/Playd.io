import React, { Component } from 'react';

import ShowSelector from './components/showSelector';
import './stylesheets/styles.css';

class App extends Component {
  constructor(props) {
    super(props);

    // define initial state
    // totalSongs
    // showHost
    // showTitle
    // showDate
    // songsList
  }

  render() {
    return (
      <div>
        <h1>Welcome to the App</h1>
        <ShowSelector />
      </div>
    );
  }
}

export default App;
