import { dateToStringYMD } from './dateParser';

describe('dateToStringYMD converts a date to string in YYYY/MM/DD format', () => {
  test('converts date to expected string format', () => {
    expect(dateToStringYMD(new Date('February 1, 2022'))).toBe('2022/02/01');
  });
  test('invalid input throws an error', () => {
    expect(() => {
      dateToStringYMD('hello');
    }).toThrowError(new Error('Invalid date'));
  });
});
