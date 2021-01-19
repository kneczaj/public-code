import moment, { Moment } from 'moment';

const dateRegex = new RegExp('^\\d{4}-\\d{2}-\\d{2}$');

function parseDateString(value: string): Moment {
  // first check if it is just date in proper format with no time and timezone
  if (!value.match(dateRegex)) {
    throw new Error(`Field parse error: value is an invalid Date`);
  }
  let date = moment.utc(value);
  // definitive check
  if(!date.isValid()) {
    throw new Error(`Field parse error: value is an invalid Date`);
  }
  return date;
}

function serializeDateString(date: Moment): string {
  if(!date.isValid()) {
    throw new Error('Field serialize error: value is an invalid Date');
  }
  return date.format('YYYY-MM-DD');
}

/**
 * A custom object to support Date scalar of strappy until this get solved:
 * https://github.com/apollographql/apollo-feature-requests/issues/2
 */
export const DATE_SCALAR = {
  parseValue: parseDateString,
  serialize: serializeDateString
};
