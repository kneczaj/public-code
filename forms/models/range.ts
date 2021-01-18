import { isUndefined } from "../../util";

export interface RangeDataFormat<T = number> {
  min: T | null;
  max: T | null;
}

/**
 * Produces valid range or null. Valid means at least with one of the limits
 * @param range
 */
export function getRange<T>({ min, max }: RangeDataFormat<T>): RangeDataFormat<T> | null {
  if (isUndefined(min) && isUndefined(max)) {
    return null;
  }
  return { min, max };
}
