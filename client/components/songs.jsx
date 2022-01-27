import React, { Component } from 'react';

function Songs(props) {
  return (
    <div className="songDetail">
      <img src={props.albumImage[2].url} />
      {props.songName} by {props.artist} on the album {props.albumName}
      <p>Track length: {props.songLength}</p>
    </div>
  );
}

export default Songs;
