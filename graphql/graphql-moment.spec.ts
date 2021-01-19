import {DATE_SCALAR} from './graphql-moment';
import moment from 'moment';

describe('GraphQLMoment Date', () => {
  // these are the same dates
  let validDate = '2016-08-15';
  let validDateUTC = '2016-08-15T10:00:32.030Z';

  let invalidDate = 'aaaa'; // This date doesn't exist

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
});
