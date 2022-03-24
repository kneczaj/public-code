import { isUndefined } from '../util';
import { Config, FORM_ERROR, SubmissionErrors } from 'final-form';
import { FetchResult } from '@apollo/client/link/core';
import { GraphQLError } from 'graphql/error/GraphQLError';
import {
  AuthenticationError,
  Errors,
  mergeErrors
} from 'public/requests/models/errors';
import { ApolloError } from '@apollo/client';

export function convertGQLErrors2Form(
  errors: ReadonlyArray<GraphQLError>
): SubmissionErrors {
  if (errors.length === 0) {
    return { [FORM_ERROR]: 'unknown error' };
  }
  try {
    // @ts-ignore
    const exceptionData = errors[0].extensions!.exception.data;
    if (exceptionData.errors) {
      return exceptionData.errors;
    }
    return { [FORM_ERROR]: exceptionData.message[0].messages[0].message };
  } catch (e) {
    return { [FORM_ERROR]: errors[0].message };
  }
}

export function convertGQLErrors2Errors(
  errors: ReadonlyArray<GraphQLError>
): Errors {
  const firstError = errors[0];
  if (isUndefined(firstError)) {
    return { messages: ['unknown error'] };
  }
  const exception: any = firstError.extensions.exception;
  try {
    if (exception.output.statusCode === 401) {
      throw new AuthenticationError();
    }
    const exceptionData = exception.data;
    if (exceptionData.errors) {
      return exceptionData.errors;
    }
    return { messages: [exceptionData.message[0].messages[0].message] };
  } catch (e) {
    if (e instanceof AuthenticationError) {
      throw e;
    }
    return { messages: [errors[0].message] };
  }
}

export function convertApolloError2Errors(error: ApolloError): Errors | null {
  const result: Errors[] = [];
  if (error.message) {
    result.push({ messages: [error.message] });
  }
  if (error.graphQLErrors) {
    result.push(convertGQLErrors2Errors(error.graphQLErrors));
  }
  if (error.networkError) {
    result.push({ messages: [error.networkError.message] });
  }
  return mergeErrors(result);
}

export interface WithGraphQLErrors {
  graphQLErrors: ReadonlyArray<GraphQLError>;
}

export function hasGraphQLErrors(val: any): val is WithGraphQLErrors {
  return !isUndefined(val.graphQLErrors) && val.graphQLErrors.length !== 0;
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
