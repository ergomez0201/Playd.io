import React, { useState } from 'react';

// functions for Datepicker library
import DatePicker from 'react-datepicker';
import { getMonth, getYear } from 'date-fns';
import range from 'lodash/range';

// import action creators

// styles and assets
import styles from './dateSelector.styles.scss';

function DateSelector(props) {
  const { startDate, setStartDate, setSkip } = props;

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
    <div className={styles.dateContainer}>
      <strong>Date </strong>
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
        onChange={(date) => {
          if (!date) return null;
          setSkip(false);
          return setStartDate(date);
        }}
        minDate={new Date('November 2, 1994')}
        maxDate={Date.now() - 24 * 60 * 60 * 1000}
        showDisabledMonthNavigation
        placeholderText="MM/DD/YYYY"
        strictParsing
      />
    </div>
  );
}

export default DateSelector;
