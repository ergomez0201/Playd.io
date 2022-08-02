import React from 'react';

import convert24HourTime from '../utils/dateParser/convert24HourTime';
import dayOfWeekMapper from '../utils/dateParser/dayOfWeekMapper';
import monthMapper from '../utils/dateParser/monthMapper';

import styles from './programDetailsDisplay.styles.scss';

function ProgramDetailsDisplay(props) {
  const { host, programTitle } = props.programDetails;
  let programStart = parseInt(props.programDetails.programStart, 10);
  let programEnd = parseInt(props.programDetails.programEnd, 10);
  const { date } = props;

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

export default ProgramDetailsDisplay;
