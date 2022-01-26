import React, { Component } from 'react';

function ShowSelector(props) {
  return (
    <div>
      <label htmlFor="showSelector">Select a radio show:</label>
      <select name="showSelector" id="showSelector">
        <option value="Morning Becomes Eclectic">Morning Becomes Eclectic</option>
        <option value="FREAKS ONLY">Freaks Only</option>
      </select>
    </div>
  );
}

export default ShowSelector;
