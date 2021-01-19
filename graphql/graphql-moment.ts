import { Moment } from 'moment';

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
  serialize: serializeDateString
};
