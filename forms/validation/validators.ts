import validator from 'validator';
import { isNull, isNullOrUndefined, isUndefined } from 'public/util';
import { skipEmptyField, ValidationResult, ValidatorFn } from './util';
import { RangeDataFormat } from '../models/range';

type FormValues = any;

const valueWithoutWhitespaces = (value: string): string =>
  value.replace(/ /g, '');

export const isNumber = skipEmptyField((value: any, values: FormValues) => {
  return validator.isNumeric(String(value)) ? null : 'numbers_only';
});

/**
 * Includes 0
 * @param value
 * @param values
 */
export const isNaturalNumber = skipEmptyField(
  (value: any, values: FormValues) => {
    return validator.isNumeric(String(value), { no_symbols: true })
      ? null
      : 'natural_numbers_only';
  }
);

/**
 * The value should be ensured to be a number first with isNumber validator
 * @param threshold
 */
export const isGreaterThan = (threshold: number) =>
  skipEmptyField((value: any, values: FormValues) => {
    return Number(value) > threshold
      ? null
      : ['must_be_greater_than', { threshold }];
  });

export const isEqualOrGreaterThan = (threshold: number) =>
  skipEmptyField((value: any, values: FormValues) => {
    return Number(value) >= threshold
      ? null
      : ['must be greater or equal', { threshold }];
  });

function isNotEmpty(value: any): boolean {
  if (typeof value === 'string' && value.trim() === '') {
    return false;
  }
  return !isNullOrUndefined(value) && value !== false;
}

export const oneRequiredDict = (value: any, values: FormValues) => {
  return typeof value === 'object' &&
    !isNull(value) &&
    Object.keys(value).filter(item => value[item]).length > 0
    ? null
    : 'at_least_one_required';
};

export function oneInFormRequired(
  value: any,
  values: FormValues
): ValidationResult {
  return !isNullOrUndefined(value) &&
    typeof value === 'object' &&
    !isUndefined(Object.keys(value).find(key => isNotEmpty(value[key])))
    ? null
    : 'at_least_one_required';
}

export const makeRequired =
  (label?: string) =>
  (value: any, values: FormValues): ValidationResult => {
    return isNotEmpty(value) ? null : isUndefined(label) ? 'required' : label;
  };

export const required = makeRequired();

export const rangeValidator: ValidatorFn = skipEmptyField(
  (value: RangeDataFormat, values: FormValues): ValidationResult => {
    if (isNullOrUndefined(value.min) || (value.min as any) === '') {
      return null;
    }
    if (isNullOrUndefined(value.max) || (value.max as any) === '') {
      return null;
    }
    const aNum = Number(value.min);
    const bNum = Number(value.max);
    if (Number.isNaN(aNum) || Number.isNaN(bNum)) {
      return null;
    }
    return aNum - bNum <= 0 ? null : 'improper_range';
  }
);

export const isEmail: ValidatorFn = skipEmptyField(
  (value: string, values: FormValues): ValidationResult => {
    return validator.isEmail(value) ? null : 'email required';
  }
);

export const containsOnlyLetters: ValidatorFn = skipEmptyField(
  (value: string, values: FormValues): ValidationResult => {
    return validator.isAlpha(valueWithoutWhitespaces(value), 'pl-PL')
      ? null
      : 'accepts only letters';
  }
);

export const isLongerThanOrEqual = (length: number): ValidatorFn =>
  skipEmptyField((value: string, values: FormValues): ValidationResult => {
    return value.length >= length
      ? null
      : ['must be longer than', { threshold: length }];
  });

export const hasLengthEqual = (length: number, label?: string): ValidatorFn =>
  skipEmptyField((value: string, values: FormValues): ValidationResult => {
    return value.length === length
      ? null
      : [label || 'must have length equal', { threshold: length }];
  });

export const isUniqueKeyword = (others: Array<string>): ValidatorFn => {
  const lowercaseOthers = others.map(item => item.toLowerCase());
  return skipEmptyField(
    (value: string, values: FormValues): ValidationResult => {
      return lowercaseOthers.includes(value.toLowerCase())
        ? 'is already among keywords'
        : null;
    }
  );
};

export const isMobilePhone: ValidatorFn = skipEmptyField(
  (value: string, values: FormValues): ValidationResult => {
    return validator.isMobilePhone(value, 'any')
      ? null
      : 'invalid phone number format';
  }
);

export const isValidHouseNumber: ValidatorFn = skipEmptyField(
  (value: string, values: FormValues): ValidationResult => {
    const charArray = value.split('');
    const lastChar = charArray[charArray.length - 1];
    if (
      validator.isNumeric(value) ||
      (validator.isAlphanumeric(valueWithoutWhitespaces(value), 'pl-PL') &&
        validator.isNumeric(value.slice(0, -1)) &&
        validator.isAlpha(lastChar, 'pl-PL'))
    )
      return null;
    return 'accepts only numbers or combination of numbers and 1 letter';
  }
);
