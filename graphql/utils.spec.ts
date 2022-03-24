import { MOCKS } from '../test';
import { convertGQLErrors2Form } from './utils';

describe('convertGQLErrors2Form', () => {
  it('converts unauthorized error', () => {
    expect(convertGQLErrors2Form([MOCKS.unathorizedError])).toEqual(
      MOCKS.unauthorizedFormError
    );
  });
});
