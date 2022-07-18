import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { getMonth, getYear } from 'date-fns';
import range from 'lodash/range';

import './showSelector.styles.scss';

function ShowSelector() {
  const [startDate, setStartDate] = useState(null);
  const years = range(1994, getYear(new Date()) + 1, 1);
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  return (
    <div>
      <p>This is the showSelector</p>
      <DatePicker
        renderCustomHeader={({
          date,
          changeYear,
          changeMonth,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => (
          <div
            style={{
              margin: 10,
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
              {'<'}
            </button>
            <select value={getYear(date)} onChange={({ target: { value } }) => changeYear(value)}>
              {years.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <select
              value={months[getMonth(date)]}
              onChange={({ target: { value } }) => changeMonth(months.indexOf(value))}
            >
              {months.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
              {'>'}
            </button>
          </div>
        )}
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        minDate={new Date('November 2, 1994')}
        maxDate={Date.now() - 24 * 60 * 60 * 1000}
        showDisabledMonthNavigation
        placeholderText="Click to select a date"
        strictParsing
      />
    </div>
  );
}

// function ShowSelector(props) {
//   function handleClick() {
//     // DOM Elements
//     const showField = document.getElementById('showSelector');
//     const yearField = document.getElementById('showYear');
//     const monthField = document.getElementById('showMonth');
//     const dayField = document.getElementById('showDay');

//     // Element Field Values
//     const showFieldValue = showField.value;
//     const yearFieldValue = yearField.value;
//     const monthFieldValue = monthField.value;
//     const dayFieldValue = dayField.value;

//     // invoke getSongs method
//     props.getSongs(showFieldValue, yearFieldValue, monthFieldValue, dayFieldValue);

//     // clear inputField
//     // yearField.value = null;
//     // monthField.value = null;
//     // dayField.value = null;
//   }

//   return (
//     <>
//       <div id="radioShow">
//         <label htmlFor="showSelector">Radio Show:</label>
//         <select name="showSelector" id="showSelector">
//           <option value="Morning Becomes Eclectic">Morning Becomes Eclectic</option>
//           <option value="FREAKS ONLY">Freaks Only</option>
//         </select>
//       </div>
//       <div id="dateForm">
//         <form>
//           <p>Select a Date:</p>
//           <label htmlFor="showYear">
//             Year:
//             <input id="showYear" placeholder="YEAR" type="text" name="showYear" />
//           </label>
//           <label htmlFor="showMonth">
//             Month:
//             <input id="showMonth" placeholder="MONTH" type="text" name="showMonth" />
//           </label>
//           <label htmlFor="showDay">
//             Day:
//             <input id="showDay" placeholder="DAY" type="text" name="showDay" />
//           </label>
//         </form>
//         <button id="findSongs" type="button" onClick={handleClick}>
//           Find Songs
//         </button>
//       </div>
//     </>
//   );
// }

export default ShowSelector;
