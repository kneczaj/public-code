import { GraphQLError, GraphQLScalarType, Kind } from 'graphql';
import { DateTime } from 'luxon';
import { dateOnly } from 'public/date-utils';

export function getDateScalar(
  locale: string
): GraphQLScalarType<DateTime, string> {
  return new GraphQLScalarType<DateTime, string>({
    name: 'Date',
    /**
     * Serialize date value into string
     * @param  {date} value date value
     * @return {String} date as string
     */
    serialize(value: unknown): string {
      if (!DateTime.isDateTime(value) || !value.isValid) {
        throw new GraphQLError(
          'Field serialize error: value is an invalid Date'
        );
      }
      return value.toFormat('yyyy-MM-dd');
    },
    /**
     * Parse value into date
     * @param  {*} value serialized date value
     * @return {date} date value
     */
    parseValue(value: unknown): DateTime {
      if (typeof value !== 'string') {
        throw new GraphQLError(
          'Field parse error: input value of Date must be string'
        );
      }
      // we keep UTC, because we do not want the day to change when timezone changes
      const date = dateOnly(DateTime.fromFormat(value, 'yyyy-MM-dd')).setLocale(
        locale
      );
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
    parseLiteral(ast): DateTime {
      if (ast.kind !== Kind.STRING) {
        throw new GraphQLError(
          'Query error: Can only parse strings to date but got: ' + ast.kind
        );
      }
      const date = dateOnly(
        DateTime.fromFormat(ast.value, 'yyyy-MM-dd')
      ).setLocale(locale);
      if (!date.isValid) {
        throw new GraphQLError('Query error: Invalid date');
      }
      return date;
    }
  });
}
