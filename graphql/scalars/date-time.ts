import { GraphQLScalarType, GraphQLError, Kind } from 'graphql';
import { DateTime } from 'luxon';

export function getDateTimeScalar(
  locale: string,
  timezone = 'local'
): GraphQLScalarType<DateTime, string> {
  return new GraphQLScalarType({
    name: 'DateTime',
    /**
     * Serialize date value into string
     * @param  {value} value date value
     * @return {String} date as string
     */
    serialize(value: unknown): string {
      if (!DateTime.isDateTime(value) || !value.isValid) {
        throw new GraphQLError(
          'Field serialize error: value is an invalid DateTime'
        );
      }
      return value.toUTC().toISO();
    },
    /**
     * Parse value into date
     * @param  {*} value serialized date value
     * @return {value} date value
     */
    parseValue(value: unknown): DateTime {
      if (typeof value !== 'string') {
        throw new GraphQLError(
          'Field parse error: input value of DateTime must be string'
        );
      }
      const date = DateTime.fromISO(value).setZone(timezone).setLocale(locale);
      if (!date.isValid) {
        throw new GraphQLError(
          'Field parse error: value is an invalid DateTime'
        );
      }
      return date;
    },
    /**
     * Parse ast literal to date
     * @param  {Object} ast graphql ast
     * @return date value
     */
    parseLiteral(ast): DateTime {
      if (ast.kind !== Kind.STRING) {
        throw new GraphQLError(
          'Query error: Can only parse strings to date-time but got: ' +
            ast.kind
        );
      }
      const date = DateTime.fromISO(ast.value)
        .setZone(timezone)
        .setLocale(locale);
      if (!date.isValid) {
        throw new GraphQLError('Query error: Invalid date-time');
      }
      return date;
    }
  });
}
