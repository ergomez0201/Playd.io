import React from 'react';

function ProgramDetailsDisplay(props) {
  const dayOfWeekMapper = {
    Mon: 'Monday',
    Tue: 'Tuesday',
    Wed: 'Wednesday',
    Thu: 'Thursday',
    Fri: 'Friday',
    Sat: 'Saturday',
    Sun: 'Sunday',
  };

  const monthMapper = {
    Jan: 'January',
    Feb: 'February',
    Mar: 'March',
    Apr: 'April',
    May: 'May',
    Jun: 'June',
    Jul: 'July',
    Aug: 'August',
    Sep: 'September',
    Oct: 'October',
    Nov: 'November',
    Dec: 'December',
  };

  const { host, programTitle } = props.programDetails;
  let programStart = parseInt(props.programDetails.programStart, 10);
  let programEnd = parseInt(props.programDetails.programEnd, 10);
  const { date } = props;

  programStart = convert24HourTime(programStart);
  programEnd = convert24HourTime(programEnd);

  const [dayOfWeek, month, day, year] = date.toString().split(' ');

  return (
    <div>
      <h3>{programTitle}</h3>
      <p>hosted by {host}</p>
      <p>{`${dayOfWeekMapper[dayOfWeek]}, ${monthMapper[month]} ${day}, ${year} \u2022 ${programStart} ${programEnd}`}</p>
    </div>
  );
}

// util function to set start and end time of program
function convert24HourTime(time) {
  if (time > 12) {
    return `${time - 12}PM`;
  }
  return `${time}AM`;
}

export default ProgramDetailsDisplay;
