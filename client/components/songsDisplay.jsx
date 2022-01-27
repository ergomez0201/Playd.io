import React, { Component } from 'react';
import Songs from './songs';

class SongsDisplay extends Component {
  constructor(props) {
    super(props);

    this.createPlaylist = this.createPlaylist.bind(this);
    this.login = this.login.bind(this);
  }

  // create a click handler
  login() {
    window.open('http://localhost:8080/api/spotify', '_blank');
  }

  createPlaylist() {
    // pull out a string of songIDs that you will pass to fetch request
    const songURIArray = [];
    this.props.songsList.forEach((song) => {
      songURIArray.push(song.uri);
    });

    console.log('button pushed');
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    // console.log(params);

    const body = {
      songURIArray,
      showTitle: this.props.showTitle,
      showDate: this.props.showDate,
      userID: params.userID,
      accessToken: params.accessToken,
      refreshToken: params.refreshToken,
    };

    fetch('/api/playlist', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON',
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success!, you have created a spotify playlist');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  render() {
    // parse through spotify data stored in this.props.songsList
    const songsData = this.props.songsList.map((song) => {
      const albumImage = song.album.images;
      const albumName = song.album.name;
      const artist = song.artists.map((artist) => artist.name).join(', ');
      const songLength = convertMstoMins(song.duration_ms);
      const songID = song.id;
      const songName = song.name;
      const songURL = song.uri;

      return (
        <Songs
          albumImage={albumImage}
          albumName={albumName}
          artist={artist}
          songLength={songLength}
          songID={songID}
          songName={songName}
          songURL={songURL}
        />
      );
    });

    return (
      <div className="songsDisplay">
        <p id="totalSongs">Total Songs in Playlist: {this.props.totalSongs}</p>
        <button type="button" onClick={this.login}>
          Login to Spotify
        </button>
        <button type="button" onClick={this.createPlaylist}>
          Create Spotify Playlist
        </button>
        {songsData}
      </div>
    );
  }
}

function convertMstoMins(ms) {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.round((ms % 60000) / 1000);

  if (seconds === 60) {
    return `${minutes + 1}:00`;
  }
  if (seconds < 10) {
    return `${minutes}:${String(seconds).padStart(2, '0')}`;
  }
  return `${minutes}:${seconds}`;
}

export default SongsDisplay;
