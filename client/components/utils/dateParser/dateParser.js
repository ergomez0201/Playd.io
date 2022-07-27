export function dateToStringYMD(date) {
  if (!(date instanceof Date)) return new Error('Enter a valid date');
  const year = date.getFullYear().toString();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  month = month < 10 ? `0${month}` : month.toString();
  day = day < 10 ? `0${day}` : day.toString();
  return `${year}/${month}/${day}`;
}

export function dateToStringMDY(date) {
  return date;
}
