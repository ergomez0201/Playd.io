import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import convert24HourTime from '../utils/dateParser/convert24HourTime';
import dayOfWeekMapper from '../utils/dateParser/dayOfWeekMapper';
import monthMapper from '../utils/dateParser/monthMapper';

import styles from './programDetailsDisplay.styles.scss';

function ProgramDetailsDisplay({ programDetails, date }) {
  const { host, programTitle } = programDetails;
  let { programStart, programEnd } = programDetails;
  programStart = parseInt(programDetails.programStart, 10);
  programEnd = parseInt(programDetails.programEnd, 10);

  programStart = convert24HourTime(programStart);
  programEnd = convert24HourTime(programEnd);

  const [dayOfWeek, month, day, year] = date.toString().split(' ');

  return (
    <div className={styles.detailsDisplay}>
      <p
        id={styles.displayDate}
      >{`${dayOfWeekMapper[dayOfWeek]}, ${monthMapper[month]} ${day}, ${year}`}</p>
      <p>{`${programStart} - ${programEnd}`}</p>
      <hr />
      <h2>{programTitle}</h2>
      <p id={styles.displayHost}>Hosted by {host}</p>
    </div>
  );
}

ProgramDetailsDisplay.propTypes = {
  programDetails: PropTypes.exact({
    host: PropTypes.string,
    programTitle: PropTypes.string,
    programStart: PropTypes.string,
    programEnd: PropTypes.string,
  }).isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
};

export default ProgramDetailsDisplay;
