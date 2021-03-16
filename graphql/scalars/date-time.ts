import { GraphQLScalarType, GraphQLError, Kind } from 'graphql';
import { DateTime } from 'luxon';
import { i18n } from 'app/i18n';

export function getDateTimeScalar(
  locale: string,
  timezone = 'local'
): GraphQLScalarType {
  return new GraphQLScalarType({
    name: 'DateTime',
    /**
     * Serialize date value into string
     * @param  {value} value date value
     * @return {String} date as string
     */
    serialize: function (value: DateTime) {
      if (!value.isValid) {
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
    parseValue: function (value: string): DateTime {
      const date = DateTime.fromISO(value)
        .setZone(timezone)
        .setLocale(i18n.language);
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
    parseLiteral: ast => {
      if (ast.kind !== Kind.STRING) {
        throw new GraphQLError(
          'Query error: Can only parse strings to date-time but got: ' +
            ast.kind
        );
      }
      const date = DateTime.fromISO(ast.value)
        .setZone('local')
        .setLocale(i18n.language);
      if (!date.isValid) {
        throw new GraphQLError('Query error: Invalid date-time');
      }
      return date;
    }
  });
}
