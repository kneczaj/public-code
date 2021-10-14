import { isNullOrUndefined, isUndefined } from 'public/util';
import { FieldState, FieldValidator } from 'final-form';

type FormValues = any;

/**
 * false if no error, otherwise true or a dict with error details
 */
export type ValidationError = [string, { [key: string]: any }] | string;
export type ValidationResult = ValidationError | null;
/**
 * A validator function which returns an error in a dict format which then can be used to generate a translated error
 * message. It is advisable to use this format to write validator functions.
 */
export type ValidatorFnSync = (
  value: any,
  values: FormValues
) => ValidationResult;
export type ValidatorFnAsync = (
  value: any,
  values: FormValues
) => Promise<ValidationResult>;
export type ValidatorFn = ValidatorFnSync | ValidatorFnAsync;
/**
 * A validator function which returns an error in string format. This format should NOT be used while writing
 * a validator. composeValidators() converts ValidatorFns to this format.
 */
export type ValidatorFnDecorator = (fn: ValidatorFnSync) => ValidatorFn;
export type Translator = (stringIdentifier: string, params?: unknown) => string;

/**
 * Takes an array of ValidatorFn or InformedValidatorFn and converts to InformedValidatorFn which throws the error
 * message of the first error which is found.
 * @param functions
 * @param asyncValidate asynchronous validator
 */
export const composeValidators =
  (
    functions: Array<ValidatorFn | FieldValidator<any> | undefined>,
    asyncValidate?: ValidatorFnAsync
  ): FieldValidator<any> =>
  (value: any, values: any, meta?: FieldState<any>) => {
    let validationResult: ValidationResult | string | undefined = null;
    for (let i = 0; i < functions.length; i++) {
      const validator = functions[i];
      validationResult = isUndefined(validator)
        ? undefined
        : validator(value, values);
      if (!isNullOrUndefined(validationResult)) {
        break;
      }
    }
    if (isNullOrUndefined(validationResult)) {
      if (!isUndefined(asyncValidate)) {
        return asyncValidate(value, values);
      }
      return undefined;
    }
    return validationResult;
  };

export const skipEmptyField: ValidatorFnDecorator =
  (fn: ValidatorFnSync) => (value: any, values: FormValues) => {
    if (typeof value === 'string' && value.trim() === '') {
      return null;
    }
    if (isNullOrUndefined(value)) {
      return null;
    }
    return fn(value, values);
  };
