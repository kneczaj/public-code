import { IntValueNode, Kind } from 'graphql';
import { DATE_SCALAR } from './date';
import { DateTime } from 'luxon';

describe('GraphQLMoment Date', () => {
  // these are the same dates
  const validDate = '2016-08-15';

  const invalidDate = 'aaaa'; // This date doesn't exist

  describe('serialize', () => {
    it('should error when serializing an invalid date', () => {
      expect(() => DATE_SCALAR.serialize(invalidDate)).toThrow(
        /Field serialize error: value is an invalid Date/
      );
    });

    it('should serialize a valid date', () => {
      expect(
        DATE_SCALAR.serialize(DateTime.fromFormat(validDate, 'yyyy-MM-dd'))
      ).toEqual('2016-08-15');
    });
  });

  describe('parseValue', () => {
    it('should error when serializing an invalid date', () => {
      expect(() => DATE_SCALAR.parseValue(invalidDate)).toThrowError(
        /^Field parse error: value is an invalid Date$/
      );
    });

    it('should parse a value to date', () => {
      const parsed = DATE_SCALAR.parseValue(validDate);
      expect(parsed.year).toEqual(2016);
      expect(parsed.month).toEqual(8);
      expect(parsed.day).toEqual(15);
      // expect(parsed.format()).toEqual(validDate);
      expect(parsed.toFormat('yyyy-MM-dd')).toEqual(validDate);
    });
  });

  describe('parseLiteral', () => {
    it('should error when parsing an ast int', () => {
      const ast: IntValueNode = {
        kind: Kind.INT,
        value: ''
      };
      expect(() => DATE_SCALAR.parseLiteral(ast, {})).toThrow(
        /Query error: Can only parse strings to date but got: IntValue/
      );
    });

    it('should error when parsing ast with invalid value', () => {
      const ast = {
        kind: Kind.STRING,
        value: invalidDate
      };
      expect(() => DATE_SCALAR.parseLiteral(ast, {})).toThrow(
        /Query error: Invalid date/
      );
    });

    it('should parse a ast literal', () => {
      const ast = {
        kind: Kind.STRING,
        value: validDate
      };
      const date = DATE_SCALAR.parseLiteral(ast, {});
      expect(DateTime.isDateTime(date)).toBe(true);
      expect(date.toFormat('yyyy-MM-dd')).toEqual(ast.value);
    });
  });
});
