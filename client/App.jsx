import React, { Component } from 'react';

import ShowSelector from './components/showSelector';
import './stylesheets/styles.css';

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
    const data = {
      showName,
      year,
      month,
      day,
    };
    fetch('/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  componentDidMount() {
    this.getSongs('Morning Becomes Eclectic', 2022, 1, 24);
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
