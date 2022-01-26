import React, { Component } from 'react';

function ShowSelector(props) {
  function handleClick() {
    // DOM Elements
    const showField = document.getElementById('showSelector');
    const yearField = document.getElementById('showYear');
    const monthField = document.getElementById('showMonth');
    const dayField = document.getElementById('showDay');

    // Element Field Values
    const showFieldValue = showField.value;
    const yearFieldValue = yearField.value;
    const monthFieldValue = monthField.value;
    const dayFieldValue = dayField.value;

    // invoke getSongs method
    props.getSongs(showFieldValue, yearFieldValue, monthFieldValue, dayFieldValue);

    // clear inputField
    // yearField.value = null;
    // monthField.value = null;
    // dayField.value = null;
  }

  return (
    <div>
      <label htmlFor="showSelector">Select a radio show:</label>
      <select name="showSelector" id="showSelector">
        <option value="Morning Becomes Eclectic">Morning Becomes Eclectic</option>
        <option value="FREAKS ONLY">Freaks Only</option>
      </select>
      <form>
        <label htmlFor="showYear">
          Year:
          <input id="showYear" type="text" name="showYear" />
        </label>
        <label htmlFor="showMonth">
          Month:
          <input id="showMonth" type="text" name="showMonth" />
        </label>
        <label htmlFor="showDay">
          Day:
          <input id="showDay" type="text" name="showDay" />
        </label>
      </form>
      <button type="button" onClick={handleClick}>
        Find Songs
      </button>
    </div>
  );
}

export default ShowSelector;
