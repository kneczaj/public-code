import { GraphQLScalarType, GraphQLError, Kind } from 'graphql';
import { DateTime } from 'luxon';
import { dateOnly } from '../../date-utils';

export const DATE_SCALAR = new GraphQLScalarType({
  name: 'Date',
  /**
   * Serialize date value into string
   * @param  {date} value date value
   * @return {String} date as string
   */
  serialize: function (value: DateTime) {
    if (!value.isValid) {
      throw new GraphQLError('Field serialize error: value is an invalid Date');
    }
    return value.toFormat('yyyy-MM-dd');
  },
  /**
   * Parse value into date
   * @param  {*} value serialized date value
   * @return {date} date value
   */
  parseValue: function (value: string): DateTime {
    // we keep UTC, because we do not want the day to change when timezone changes
    const date = dateOnly(DateTime.fromFormat(value, 'yyyy-MM-dd'));
    if (!date.isValid) {
      throw new GraphQLError('Field parse error: value is an invalid Date');
    }
    return date;
  },
  /**
   * Parse ast literal to date
   * @param  {Object} ast graphql ast
   * @return {date} date value
   */
  parseLiteral: ast => {
    if (ast.kind !== Kind.STRING) {
      throw new GraphQLError(
        'Query error: Can only parse strings to date but got: ' + ast.kind
      );
    }
    const date = dateOnly(DateTime.fromFormat(ast.value, 'yyyy-MM-dd'));
    if (!date.isValid) {
      throw new GraphQLError('Query error: Invalid date');
    }
    return date;
  }
});
