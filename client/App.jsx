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
    // this.getSongs = this.getSongs.bind(this);
  }

  componentDidMount() {
    function getSongs(showName, year, month, day) {
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
          console.log('Success:', data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }

    getSongs('Morning Becomes Eclectic', 2022, 1, 24);
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
