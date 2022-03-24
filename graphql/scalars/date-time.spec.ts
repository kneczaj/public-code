import { IntValueNode, Kind, ValueNode } from 'graphql';
import { getDateTimeScalar } from './date-time';
import { DateTime } from 'luxon';
import { GraphQLScalarLiteralParser } from "graphql/type/definition";

describe('GraphQLMoment DateTime', () => {
  // these are the same dates
  const validDateTime = '2016-08-15T12:00:32.030+02:00';
  const validDateTimeUTC = '2016-08-15T10:00:32.030Z';

  // Date (not DateTime) scalar should be used for this
  const invalidDateTime = '2016-04-31'; // This date doesn't exist
  const locale = 'pl-PL';
  const timezone = 'UTC+2';

  const DATE_TIME_SCALAR = getDateTimeScalar(locale, timezone);

  describe('serialize', () => {
    it('should error when serializing an invalid date', () => {
      expect(
        DATE_TIME_SCALAR.serialize.bind(DATE_TIME_SCALAR, invalidDateTime)
      ).toThrow(/Field serialize error: value is an invalid Date/);
    });

    it('should serialize a valid date-time with timezone', () => {
      // this should serialize any timezone to UTC
      expect(
        DATE_TIME_SCALAR.serialize(DateTime.fromISO(validDateTime))
      ).toEqual('2016-08-15T10:00:32.030Z');
    });

    it('should serialize a valid date-time in UTC', () => {
      expect(
        DATE_TIME_SCALAR.serialize(DateTime.fromISO(validDateTimeUTC))
      ).toEqual('2016-08-15T10:00:32.030Z');
    });
  });

  describe('parseValue', () => {
    it('should error when serializing an invalid date-time', () => {
      expect(() => DATE_TIME_SCALAR.parseValue(invalidDateTime)).toThrowError(
        /^Field parse error: value is an invalid DateTime$/
      );
    });

    it('should parse a value to date-time', () => {
      expect(DATE_TIME_SCALAR.parseValue(validDateTime)).toEqual(
        DateTime.fromISO(validDateTime).setLocale(locale).setZone(timezone)
      );
    });

    it('should parse a UTC value to date-time in given timezone', () => {
      const momentDate: DateTime = DATE_TIME_SCALAR.parseValue(validDateTime);
      expect(momentDate.offset).toBe(120); // in minutes
      expect(momentDate.hour).toBe(12);
      expect(DATE_TIME_SCALAR.parseValue(validDateTime)).toEqual(
        DateTime.fromISO(validDateTimeUTC).setLocale(locale).setZone(timezone)
      );
    });
  });

  describe('parseLiteral', () => {
    it('should error when parsing an ast int', () => {
      const ast: IntValueNode = {
        kind: Kind.INT,
        value: ''
      };
      expect(() => DATE_TIME_SCALAR.parseLiteral(ast, {})).toThrow(
        /Query error: Can only parse strings to date-time but got: IntValue/
      );
    });

    it('should error when parsing ast with invalid value', () => {
      const ast = {
        kind: Kind.STRING,
        value: invalidDateTime
      };
      expect(DATE_TIME_SCALAR.parseLiteral.bind(DATE_TIME_SCALAR, ast)).toThrow(
        /Query error: Invalid date-time/
      );
    });

    it('should parse a ast literal', () => {
      const ast: ValueNode = {
        kind: Kind.STRING,
        value: validDateTime
      };
      const date: DateTime = DATE_TIME_SCALAR.parseLiteral(ast, {});
      expect(DateTime.isDateTime(date)).toBe(true);
      expect(date.toJSON()).toEqual(ast.value);
    });
  });
});
