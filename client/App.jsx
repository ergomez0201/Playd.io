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
      <div>
        <h1>Welcome to the App</h1>
        <ShowSelector getSongs={this.getSongs} />
        <ShowDisplay
          showTitle={this.state.showTitle}
          showHost={this.state.showHost}
          showDate={this.state.showDate}
        />
        <SongsDisplay totalSongs={this.state.totalSongs} songsList={this.state.songsList} />
      </div>
    );
  }
}

export default App;
