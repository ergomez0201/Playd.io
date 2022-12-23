import React from 'react';
import PropTypes from 'prop-types';

// functions for Datepicker library
import DatePicker from 'react-datepicker';
import { getMonth, getYear } from 'date-fns';
import range from 'lodash/range';
import getKCRW from '../utils/api/api';
import { dateToStringYMD } from '../utils/dateParser/dateParser';

// import action creators

// styles and assets
import styles from './dateSelector.styles.scss';

function DateSelector(props) {
  const { startDate, setStartDate, setFullTrackList } = props;

  const onDateChange = async (date) => {
    if (!date) return null;

    const [year, month, day] = dateToStringYMD(date).split('/');
    const data = await getKCRW({
      year,
      month,
      day,
    });
    console.log('this is the data that comes back: ', data);
    if (data.isError) {
      // TODO: logic to handle errors
    } else {
      setFullTrackList(data.data);
    }
    setStartDate(date);
  };

  const handleDateChangeRaw = (e) => {
    e.preventDefault();
  };

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
        wrapperClassName={styles.datePicker}
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
            <button type="button" onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
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

            <button type="button" onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
              {'>'}
            </button>
          </div>
        )}
        selected={startDate}
        onChange={(date) => {
          onDateChange(date);
        }}
        minDate={new Date('November 2, 1994')}
        maxDate={Date.now() - 24 * 60 * 60 * 1000}
        dateFormat="  MMMM dd, yyyy"
        showDisabledMonthNavigation
        placeholderText="  Select a date"
        strictParsing
        onChangeRaw={(e) => handleDateChangeRaw(e)}
      />
    </div>
  );
}

DateSelector.propTypes = {
  startDate: PropTypes.instanceOf(Date),
  setStartDate: PropTypes.func.isRequired,
};

DateSelector.defaultProps = {
  startDate: null,
};

export default DateSelector;
