import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// functions for Datepicker library
import DatePicker from 'react-datepicker';
import { getMonth, getYear } from 'date-fns';
import range from 'lodash/range';
import { useGetKcrwDataQuery } from '../../features/api/apiSlice';
import { dateToStringYMD } from '../utils/dateParser';

// import action creators
import { dateUpdate } from '../../store/reducers/displayReducer';

// styles and assets
import './dateSelector.styles.scss';

function DateSelector() {
  const [startDate, setStartDate] = useState(null);
  const [skip, setSkip] = useState(true);

  const dispatch = useDispatch();

  const kcrw = useSelector((state) => state.kcrw);
  const reduxDate = useSelector((state) => state.display.date);
  console.log('this is the kcrw slice: ', kcrw);
  console.log('this is the date from redux: ', reduxDate);
  let stringYear;
  let stringMonth;
  let stringDay;
  if (startDate) [stringYear, stringMonth, stringDay] = dateToStringYMD(startDate).split('/');
  useGetKcrwDataQuery(
    { year: stringYear, month: stringMonth, day: stringDay },
    {
      skip,
    }
  );

  const onDateSubmit = () => {
    const stringDate = dateToStringYMD(startDate);
    dispatch(dateUpdate(stringDate));
    console.log('inside onDateSubmit function');
    setSkip(false);
  };

  // need a function to parse startDate state value to dispatch to thunk

  // Datepicker logic
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
      <button type="button" onClick={onDateSubmit}>
        {'>'}
      </button>
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

export default DateSelector;
