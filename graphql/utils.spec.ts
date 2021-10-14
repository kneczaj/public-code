import { MOCKS } from '../test';
import { convertGQLErrors2Form, makeMutationRequest } from './utils';
import { MutationFunctionOptions } from '@apollo/client/react/types/types';
import { FetchResult } from '@apollo/client/link/core';

describe('convertGQLErrors2Form', () => {
  it('converts unauthorized error', () => {
    expect(convertGQLErrors2Form([MOCKS.unathorizedError])).toEqual(
      MOCKS.unauthorizedFormError
    );
  });
});

describe('makeMutationRequest', function () {
  const mock = {
    mutation: jest.fn<
      Promise<FetchResult<any>>,
      [MutationFunctionOptions<any, any>]
    >(() => Promise.resolve(MOCKS.fetchResultAllFieldsSuccess)),
    errorMutation: jest.fn<
      Promise<FetchResult<any>>,
      [MutationFunctionOptions<any, any>]
    >(() => Promise.resolve(MOCKS.errorResponse1))
  };

  it('passes all args when no errors', async () => {
    const mutation = jest.spyOn(mock, 'mutation');
    const request = makeMutationRequest(mutation as any);
    expect(await request({})).toEqual(MOCKS.fetchResultAllFieldsSuccess);
  });

  it('interprets error from mutation with unauthorized error response', async () => {
    const mutation = jest.spyOn(mock, 'errorMutation');
    const request = makeMutationRequest(mutation as any);
    expect(await request({})).toEqual({
      ...MOCKS.errorResponse1,
      errors: MOCKS.unauthorizedFormError
    });
  });
});
