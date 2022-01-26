import React, { Component } from 'react';

function ShowDisplay(props) {
  const [year, month, day] = props.showDate;
  const date = new Date(year, month - 1, day);
  return (
    <div id="showDisplay">
      <p id="showTitle">Radio Show: {props.showTitle}</p>
      <p id="showHost">Host(s): {props.showHost}</p>
      <p id="showDate">Date: {date.toDateString()}</p>
    </div>
  );
}

export default ShowDisplay;
