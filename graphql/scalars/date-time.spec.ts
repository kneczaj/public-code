import { IntValueNode, Kind } from 'graphql';
import { getDateTimeScalar } from './graphql-moment';
import moment, { Moment } from 'moment';

describe('GraphQLMoment DateTime', () => {
  // these are the same dates
  let validDateTime = '2016-08-15T12:00:32.030+02:00';
  let validDateTimeUTC = '2016-08-15T10:00:32.030Z';

  // Date (not DateTime) scalar should be used for this
  let invalidDateTime = '2016-04-31'; // This date doesn't exist

  const DATE_TIME_SCALAR = getDateTimeScalar('-3:00');

  describe('serialize', () => {
    it('should error when serializing an invalid date', () => {
      expect(
        DATE_TIME_SCALAR.serialize.bind(DATE_TIME_SCALAR, invalidDateTime)
      ).toThrow(/Field serialize error: value is an invalid Date/);
    });

    it('should serialize a valid date-time with timezone', () => {
      // this should serialize any timezone to UTC
      expect(
        DATE_TIME_SCALAR.serialize(moment(validDateTime))
      ).toEqual('2016-08-15T10:00:32Z');
    });

    it('should serialize a valid date-time in UTC', () => {
      expect(
        DATE_TIME_SCALAR.serialize(moment(validDateTimeUTC))
      ).toEqual('2016-08-15T10:00:32Z');
    });
  });

  describe('parseValue', () => {
    it('should error when serializing an invalid date-time', () => {
      expect(
        () => DATE_TIME_SCALAR.parseValue(invalidDateTime)
      ).toThrowError(/^Field parse error: value is an invalid DateTime$/);
    });

    it('should parse a value to date-time', () => {
      expect(
        DATE_TIME_SCALAR.parseValue(validDateTime)
      ).toEqual(moment(validDateTime, moment.ISO_8601).utc());
    });

    it.only('should parse a UTC value to date-time', () => {
      const momentDate: Moment = DATE_TIME_SCALAR.parseValue(validDateTime);
      expect(momentDate.utcOffset()).toBe(3);
      expect(momentDate.hour()).toBe(3);
      expect(
        DATE_TIME_SCALAR.parseValue(validDateTime)
      ).toEqual(moment(validDateTimeUTC, moment.ISO_8601).utc());
    });
  });

  describe('parseLiteral', () => {
    it('should error when parsing an ast int', () => {
      let ast: IntValueNode = {
        kind: Kind.INT,
        value: ''
      };
      expect(
        () => DATE_TIME_SCALAR.parseLiteral(ast, {})
      ).toThrow(/Query error: Can only parse strings to date-time but got: IntValue/);
    });

    it('should error when parsing ast with invalid value', () => {
      let ast = {
        kind: Kind.STRING,
        value: invalidDateTime
      };
      expect(
        DATE_TIME_SCALAR.parseLiteral.bind(DATE_TIME_SCALAR, ast)
      ).toThrow(/Query error: Invalid date-time/);
    })

    it('should parse a ast literal', () => {
      let ast = {
        kind: Kind.STRING,
        value: validDateTime
      };
      let date = DATE_TIME_SCALAR.parseLiteral(ast, {})
      expect(moment.isMoment(date)).toBe(true);
      expect(date.toJSON()).toEqual(ast.value)
    });
  });
});
