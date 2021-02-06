import { isNull, isUndefined } from '../util';
import { Config, FORM_ERROR, SubmissionErrors } from 'final-form';
import { FetchResult } from '@apollo/client/link/core';
import { MutationFunctionOptions } from '@apollo/client/react/types/types';
import { GraphQLError } from 'graphql/error/GraphQLError';

function convertGQLErrors2Form(
  errors: ReadonlyArray<GraphQLError>
): SubmissionErrors {
  if (errors.length === 0) {
    return { [FORM_ERROR]: 'unknown error' };
  }
  try {
    const exceptionData = errors[0].extensions!.exception.data;
    if (exceptionData.errors) {
      return exceptionData.errors;
    }
    return { [FORM_ERROR]: exceptionData.message[0].messages[0].message };
  } catch (e) {
    return { [FORM_ERROR]: errors[0].message };
  }
}

export type FinalFormSubmissionResult<
  FormValues,
  InitialFormValues = Partial<FormValues>
> = ReturnType<Config<FormValues, InitialFormValues>['onSubmit']>;

/**
 * It is the GraphQL mutation response with `errors` property matching the format expected by final forms
 */
export interface FinalFormSubmissionMutationResult<TData, FormValues>
  extends Omit<FetchResult<TData>, 'errors'> {
  errors?: FinalFormSubmissionResult<FormValues>;
}

export function makeMutationRequest<TData, FormValues>(
  mutation: (
    options?: MutationFunctionOptions<TData, FormValues>
  ) => Promise<FetchResult<TData>>
): (
  variables: FormValues
) => Promise<FinalFormSubmissionMutationResult<TData, FormValues>> {
  return async (
    variables: FormValues
  ): Promise<FinalFormSubmissionMutationResult<TData, FormValues>> => {
    try {
      const response = await mutation({ variables });
      const baseErrors = isUndefined(response.errors)
        ? undefined
        : convertGQLErrors2Form(response.errors);
      const errors = isNull(response.data)
        ? {
            ...baseErrors,
            [FORM_ERROR]: `Empty response from server`
          }
        : baseErrors;
      return isUndefined(errors)
        ? response
        : {
            ...response,
            errors
          };
    } catch (e) {
      if (isUndefined(e.graphQLErrors) || e.graphQLErrors.length === 0) {
        console.error(e);
        return {
          data: null,
          errors: {
            [FORM_ERROR]: isUndefined(e.message) ? 'unknown error' : e.message
          }
        };
      }
      return {
        data: null,
        errors: convertGQLErrors2Form(e.graphQLErrors)
      };
    }
  };
}
