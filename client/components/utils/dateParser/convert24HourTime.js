function convert24HourTime(time) {
  if (time > 12) {
    return `${time - 12}pm`;
  }
  return `${time}am`;
}

export default convert24HourTime;
