function convert24HourTime(time) {
  if (time > 12) {
    return `${time - 12}pm`;
  }
  if (time === 0) {
    return '12am';
  }
  if (time === 12) {
    return '12pm';
  }
  return `${time}am`;
}

export default convert24HourTime;
