import { isNullOrUndefined } from '../util';

/**
 * This should be always used together with isNaturalNumber validator so only real numbers will pass validation
 * @param value
 */
export function naturalNumberParser(value: any): number {
  if (isNullOrUndefined(value)) {
    return value as unknown as number;
  }
  if (typeof value === 'number') {
    if (Number.isNaN(value)) {
      return 0;
    }
    return value;
  }
  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (trimmed === '') {
      return undefined as unknown as number;
    }
    if (!trimmed.match(/^[0-9]*$/g)) {
      return value as unknown as number;
    }
    const numberVal = Number(value);
    if (Number.isNaN(numberVal)) {
      return value as unknown as number;
    }
    return numberVal;
  }
  return value;
}

export function naturalNumberFormat(value: any) {
  if (typeof value === 'string') {
    return value.replace(/[^\d]/g, '');
  }
  return value;
}
