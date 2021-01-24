import moment, { Moment } from 'moment';
import {GraphQLScalarType, GraphQLError, Kind} from 'graphql';

export function getDateTimeScalar(timezone: string) {
  return new GraphQLScalarType({
    name: 'DateTime',
    /**
     * Serialize date value into string
     * @param  {moment} value date value
     * @return {String} date as string
     */
    serialize: function (value) {
      let date = moment.utc(value);
      if(!date.isValid()) {
        throw new GraphQLError('Field serialize error: value is an invalid DateTime');
      }
      return date.format();
    },
    /**
     * Parse value into date
     * @param  {*} value serialized date value
     * @return {moment} date value
     */
    parseValue: function (value): Moment {
      let date = moment.tz(value);
      if(!date.isValid()) {
        throw new GraphQLError('Field parse error: value is an invalid DateTime');
      }
      return date;
    },
    /**
     * Parse ast literal to date
     * @param  {Object} ast graphql ast
     * @return {moment} date value
     */
    parseLiteral: (ast) => {
      if(ast.kind !== Kind.STRING) {
        throw new GraphQLError('Query error: Can only parse strings to date-time but got: ' + ast.kind);
      }
      let date = moment(ast.value);
      if(!date.isValid()) {
        throw new GraphQLError('Query error: Invalid date-time');
      }
      return date;
    }
  });
}
