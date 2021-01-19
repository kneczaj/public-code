import {isNull, isUndefined} from "../util";
import { Config, FORM_ERROR } from "final-form";
import {FetchResult} from "@apollo/client/link/core";
import {MutationFunctionOptions} from "@apollo/client/react/types/types";
import {GraphQLError} from "graphql/error/GraphQLError";

function convertGQLErrors2Form(errors: ReadonlyArray<GraphQLError>): object {
  if (errors.length === 0) {
    return { [FORM_ERROR]: "unknown error"}
  }
  try {
    const exceptionData = errors[0].extensions!.exception.data;
    if (exceptionData.errors) {
      return exceptionData.errors;
    }
    return { [FORM_ERROR]: exceptionData.message[0].messages[0].message }
  } catch (e) {
    return { [FORM_ERROR]: errors[0].message }
  }
}

export type FinalFormSubmissionResult<FormValues, InitialFormValues = Partial<FormValues>> =
  ReturnType<Config<FormValues, InitialFormValues>['onSubmit']>;

export function makeMutationRequest<TData, FormValues>(
  mutation: (options?: MutationFunctionOptions<TData, FormValues>) => Promise<FetchResult<TData>>,
  onSuccess?: (data: TData) => void,
  onError?: (e: any) => void
): ((variables: FormValues) => Promise<FinalFormSubmissionResult<FormValues>>) {
  return async (variables: FormValues): Promise<FinalFormSubmissionResult<FormValues>> => {
    try {
      const response = await mutation({ variables });
      if (response.errors) {
        onError && onError(null);
        return convertGQLErrors2Form(response.errors);
      }
      if (isNull(response.data)) {
        return {[FORM_ERROR]: `Empty response from server`};
      }
      onSuccess && onSuccess(response.data!); // to test when it is undefined
      return undefined;
    } catch (e) {
      if (isUndefined(e.graphQLErrors)) {
        onError && onError(e);
        return undefined;
      }
      onError && onError(e);
      return convertGQLErrors2Form(e.graphQLErrors);
    }
  }
}
