import { dateToStringYMD } from './dateParser';

test('converts a date to string in YYYY/MM/DD format', () => {
  expect(dateToStringYMD(new Date('February 1, 2022'))).toBe('2022/02/01');
  expect(dateToStringYMD('hello')).toBeInstanceOf(Error);
});
