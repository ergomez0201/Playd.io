import React, { Component } from 'react';
import Songs from './songs';

class SongsDisplay extends Component {
  constructor(props) {
    super(props);
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
        <button type="button">Create Spotify Playlist</button>
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
