import React, { Component } from 'react';

function Songs(props) {
  return (
    <div className="songDetail">
      <div className="albumImage">
        <img src={props.albumImage[2].url} />
      </div>
      <div className="songAndArtist">
        <p>
          <strong>{props.songName}</strong>
        </p>
        <p>Artist(s): {props.artist}</p>
      </div>
      <div className="albumAndLength">
        <p>Album: {props.albumName}</p>
        <p>Track length: {props.songLength}</p>
      </div>
    </div>
  );
}

export default Songs;
