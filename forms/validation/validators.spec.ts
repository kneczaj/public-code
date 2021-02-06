import {
  composeValidators,
  isUniqueKeyword,
  ValidationError,
  ValidatorFn
} from './index';
import {
  isGreaterThan,
  isEqualOrGreaterThan,
  isNaturalNumber,
  isNumber,
  oneInFormRequired,
  oneRequiredDict,
  rangeValidator,
  required,
  isEmail,
  containsOnlyLetters,
  isValidHouseNumber
} from './validators';
import { translationResources } from '../../../app/i18n';

function testValidator(
  validatorName: string,
  expectedResult: ValidationError,
  validator: ValidatorFn,
  passes: Array<any>,
  fails: Array<any>
) {
  const errorStringIdentifier = Array.isArray(expectedResult)
    ? expectedResult[0]
    : expectedResult;
  describe(validatorName, () => {
    passes.forEach(value => {
      const valueStr =
        typeof value === 'object' ? JSON.stringify(value) : value;
      it(`passes with value '${valueStr}'`, () =>
        expect(validator(value, null as any)).toBeNull());
    });
    fails.forEach(value => {
      const valueStr =
        typeof value === 'object' ? JSON.stringify(value) : value;
      it(`fails with value '${valueStr}'`, () => {
        const result = validator(value, null as any);
        expect(result).not.toBeNull();
        expect(result).toEqual(expectedResult);
      });
    });
    it('has translation', () => {
      Object.keys(translationResources)
        .filter(lang => lang !== 'en')
        .forEach(language => {
          const resource = (translationResources as any)[language].translation;
          expect(Object.keys(resource)).toContain(errorStringIdentifier);
        });
    });
    if (Array.isArray(expectedResult)) {
      // if there are error details this should be included also in English translation
      it('uses error details to generate the translation', () => {
        Object.keys(translationResources).forEach(language => {
          const resource = (translationResources as any)[language].translation;
          const translation = resource[errorStringIdentifier];
          Object.keys(expectedResult[1]).forEach(detail => {
            expect(translation).toMatch(
              new RegExp(`{{\\s*${detail}\\s*}}`, 'g')
            );
          });
        });
      });
    }
  });
}

const emptyValues: Array<any> = ['', null, undefined, ' '];

describe('validators', () => {
  describe('compose', () => {
    describe('with validators returning a dict', () => {
      let validator: ValidatorFn;

      beforeEach(() => {
        validator = composeValidators([isNumber, isNaturalNumber]);
      });

      it('returns error detail of the first error when more fail', () => {
        expect(validator('a', null as any)).toBe('numbers_only');
      });

      it('returns error detail of the first error when some passes', () => {
        expect(validator('-1', null as any)).toBe('natural_numbers_only');
      });

      it('returns undefined when no error', () => {
        expect(validator('1', null as any)).toBe(undefined);
      });
    });
  });

  testValidator(
    'required',
    'required',
    required,
    ['fdsa', '4', 'a', '53241.'],
    emptyValues.concat(false)
  );
  testValidator(
    'isNumber',
    'numbers_only',
    isNumber,
    emptyValues.concat(['4', '-4', '1.0', '-1.0', '0', '-.1', '.1', 4, 1.0]),
    ['a', '-a', ',', '-', '4a', 'a4']
  );
  testValidator(
    'isNaturalNumber',
    'natural_numbers_only',
    isNaturalNumber,
    emptyValues.concat(['1', '10', '0', 4, 1.0]),
    ['-1', '0.1', 'a', '-a', '-0.1', -1, 1.1]
  );
  testValidator(
    'oneRequired',
    'at_least_one_required',
    oneRequiredDict,
    [
      { a: true, b: false },
      [{ a: true, b: true }],
      { a: true, b: undefined },
      { a: true, b: '' }
    ],
    emptyValues.concat([
      {},
      { a: '', b: '' },
      { a: undefined, b: undefined },
      { a: false, b: false }
    ])
  );
  testValidator(
    'oneInFormRequired',
    'at_least_one_required',
    oneInFormRequired,
    [
      { a: true, b: false },
      { a: true, b: true },
      { a: 'a', b: undefined },
      { a: 'a', b: 'b' }
    ],
    emptyValues.concat([{}, { a: '' }, { a: false, b: false }])
  );
  testValidator(
    'rangeValidator',
    'improper_range',
    rangeValidator,
    [
      { min: 'a', max: 'b' },
      { min: 'b', max: 'a' },
      { min: '-1', max: '2.0' },
      { min: '2', max: '3' },
      { min: '2', max: null },
      { min: '2', max: undefined },
      { min: '2', max: '' },
      { min: null, max: '3' },
      { min: undefined, max: '3' },
      { min: '', max: '3' },
      { min: '', max: '' },
      { min: null, max: null },
      { min: undefined, max: undefined },
      { min: null, max: undefined },
      { min: undefined, max: null }
    ],
    [
      { min: '2', max: '1' },
      { min: '-2', max: '-3' }
    ]
  );
  testValidator(
    'isGreaterThan',
    ['must_be_greater_than', { threshold: 0 }],
    isGreaterThan(0),
    emptyValues.concat(['1', '20', '1.2']),
    ['0', '-1', '-0.4']
  );
  testValidator(
    'isEqualOrGreaterThan',
    ['must be greater or equal', { threshold: 0 }],
    isEqualOrGreaterThan(0),
    emptyValues.concat(['0', '1', '1.2']),
    ['-1', '-0.1', '-1.2']
  );
  testValidator(
    'isEmail',
    'email required',
    isEmail,
    emptyValues.concat(['aaaa@fsdjkf.pl']),
    ['0', '-1', 'afdsfsd', '.pl', 'bgg.com', '323fd@gdfgd']
  );
  testValidator(
    'isUniqueKeyword',
    'is already among keywords',
    isUniqueKeyword(['AaA', 'whatever', 'tralaLa']),
    emptyValues.concat('bbb', 'a'),
    ['aaa', 'aAa', 'TralaLa']
  );
  testValidator(
    'containsOnlyLetters',
    'accepts only letters',
    containsOnlyLetters,
    emptyValues.concat('AaXZ', 'a', 'B'),
    ['2Wy', '%1A', '%A']
  );
  testValidator(
    'isValidHouseNumber',
    'accepts only numbers or combination of numbers and 1 letter',
    isValidHouseNumber,
    emptyValues.concat('213', '2', '1a', '44f'),
    ['ads', 'a1', '1%', '%1', '%a5', '1a1a']
  );
});
