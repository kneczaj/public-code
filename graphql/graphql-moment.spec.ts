import { DATE_SCALAR } from './graphql-moment';
import moment, { Moment } from 'moment';

describe('GraphQLMoment Date', () => {
  // these are the same dates
  let validDate = '2016-08-15';
  let validDateUTC = '2016-08-15T10:00:32.030Z';

  let invalidDate = 'aaaa'; // This date doesn't exist
  let invalidDate2 = '2016-08-15T12:00:32.030+02:00';

  describe('serialize', () => {
    it('should error when serializing an invalid date', () => {
      const warn = jest.spyOn(console, 'warn').mockImplementation(() => undefined);
      // this throws a warning so the upper is to hide the warning from console
      const invalidMoment = moment(invalidDate);
      warn.mockRestore();
      expect(
        () => DATE_SCALAR.serialize(invalidMoment)
      ).toThrowError(/Field serialize error: value is an invalid Date/);
    });

    it('should serialize a valid date with timezone', () => {
      // this should serialize any timezone to UTC
      expect(
        DATE_SCALAR.serialize(moment(validDate))
      ).toEqual('2016-08-15');
    });

    it('should serialize a valid date in UTC', () => {
      expect(
        DATE_SCALAR.serialize(moment(validDateUTC))
      ).toEqual('2016-08-15');
    });
  });

  describe('parseValue', () => {
    it('should error when serializing an invalid date', () => {
      expect(
        () => DATE_SCALAR.parseValue(invalidDate)
      ).toThrowError(/^Field parse error: value is an invalid Date$/);
      expect(
        () => DATE_SCALAR.parseValue(invalidDate2)
      ).toThrowError(/^Field parse error: value is an invalid Date$/);
    });

    it('should parse a value to date', () => {
      const parsed: Moment = DATE_SCALAR.parseValue(validDate);
      expect(parsed.date()).toBe(15);
      expect(parsed.month()).toBe(7); // starts from 0
      expect(parsed.year()).toBe(2016);
      expect(parsed.format("YYYY-MM-DD")).toBe("2016-08-15");
      expect(parsed.hour()).toBe(0);
      expect(parsed.minute()).toBe(0);
      expect(parsed.second()).toBe(0);
      expect(parsed.utcOffset()).toBe(0);
      expect(parsed.millisecond()).toBe(0);
    });
  });
});
