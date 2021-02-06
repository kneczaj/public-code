import { DateTime } from 'luxon';

/**
 * This sets the DateTime object to the middle of the day in UTC. After this operation the date part will never be
 * changed if we set the time zone to any other.
 * @param dateTime
 */
export function dateOnly(dateTime: DateTime) {
  return dateTime
    .set({
      hour: 12,
      minute: 0,
      second: 0,
      millisecond: 0
    })
    .toUTC()
    .set({
      hour: 12,
      minute: 0,
      second: 0,
      millisecond: 0
    });
}

export function today(): DateTime {
  return dateOnly(DateTime.utc());
}
