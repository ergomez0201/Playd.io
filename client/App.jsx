import React, { Component } from 'react';

import ShowSelector from './components/showSelector';
import ShowDisplay from './components/showDisplay';
import './stylesheets/styles.css';
import SongsDisplay from './components/songsDisplay';

class App extends Component {
  constructor(props) {
    super(props);

    // define initial state

    this.state = {
      totalSongs: 0,
      showHost: '',
      showTitle: '',
      showDate: [],
      songsList: [],
    };
    // console.log(this.state);
    this.getSongs = this.getSongs.bind(this);
  }

  getSongs(showName, year, month, day) {
    const body = {
      showName,
      year,
      month,
      day,
    };
    fetch('/api/', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON',
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => {
        const tracksArray = data.trackData.tracks;
        return this.setState({
          totalSongs: tracksArray.length,
          showHost: data.radioShow[0].host,
          showTitle: showName,
          showDate: [year, month, day],
          songsList: tracksArray,
        });
      })
      .then((data) => {
        console.log('state: ', this.state);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  // getSongs('Morning Becomes Eclectic', 2022, 1, 24);

  render() {
    return (
      <main className="outerContainer">
        <div className="header">
          <h1 id="appHeader">Playd.io</h1>
          <h3>Create Playlist from your favorite Radio Show</h3>
        </div>
        <div className="showSelectorDiv">
          <ShowSelector getSongs={this.getSongs} />
        </div>
        <div className="showDisplayDiv">
          <ShowDisplay
            showTitle={this.state.showTitle}
            showHost={this.state.showHost}
            showDate={this.state.showDate}
          />
        </div>
        <div className="songsDisplayDiv">
          <SongsDisplay totalSongs={this.state.totalSongs} songsList={this.state.songsList} />
        </div>
      </main>
    );
  }
}

export default App;
