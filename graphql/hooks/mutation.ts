import { useMutation as useMutationBase } from "@apollo/client";
import { OperationVariables } from "@apollo/client/core";
import { DocumentNode } from "graphql";
import { TypedDocumentNode } from "@graphql-typed-document-node/core";
import { MutationFunctionOptions, MutationHookOptions } from "@apollo/client/react/types/types";
import { FORM_ERROR, SubmissionErrors } from "final-form";
import { useCallback } from "react";
import { isNull, isNullOrUndefined, isUndefined } from "public/util";
import {
  convertApolloError2Errors,
  convertGQLErrors2Errors,
  convertGQLErrors2Form,
  hasGraphQLErrors
} from "public/graphql/utils";
import { AuthenticationError, Errors } from "public/requests/models/errors";
import { FetchResult, MutationResult } from "public/graphql/models";
import { useNotifications } from "public/notifications/notifications-provider";
import { useCT } from "public/hooks/translation";
import { useToken } from "public/auth/providers/token-provider";

export type MutationSubmitResult = Promise<SubmissionErrors | undefined>

export interface Hook<TData, TVariables> extends MutationResult<TData> {
  trigger: (options?: MutationFunctionOptions<TData, TVariables>) => Promise<FetchResult<TData>>,
  /**
   * This can trigger mutation to return errors format specially for final-form
   * @param options
   */
  submit: (formValues: TVariables) => MutationSubmitResult
}

export function useMutation<TData = any, FormValues = OperationVariables>(
  mutation: DocumentNode | TypedDocumentNode<TData, FormValues>,
  options?: MutationHookOptions<TData, FormValues>
): Hook<TData, FormValues> {
  const [triggerBase, result] = useMutationBase(mutation, options);
  const {redirectToLogin} = useToken();
  const {show} = useNotifications();
  const ct = useCT();
  const trigger = useCallback(async (options?: MutationFunctionOptions<TData, FormValues>): Promise<FetchResult<TData>> => {
    const {data, ...response} = await triggerBase(options);
    const error: Errors | null = (() => {
      try {
        return isUndefined(response.errors)
          ? isNullOrUndefined(data)
            ? {messages: [`Empty response from server`]}
            : null
          : convertGQLErrors2Errors(response.errors)
      } catch (e) {
        if (e instanceof AuthenticationError) {
          redirectToLogin();
        } else {
          show({type: 'error', message: ct('unknown error occurred')});
        }
        return null;
      }
    })();
    return {
      ...response,
      data: data || null,
      error
    }
  }, [triggerBase, redirectToLogin, ct, show]);
  const submit = useCallback(async (
    formValues: FormValues
  ): Promise<SubmissionErrors | undefined> => {
    try {
      const {error} = await trigger({variables: formValues});
      if (isNull(error)) {
        return undefined;
      }
      // TODO: support error by field
      return {
        [FORM_ERROR]: error.messages[0]
      }
    } catch (e: any) {
      if (e instanceof AuthenticationError) {
        redirectToLogin();
        return {
          [FORM_ERROR]: ct('authentication error')
        };
      }
      if (hasGraphQLErrors(e)) {
        console.error(e);
        return convertGQLErrors2Form(e.graphQLErrors);
      }
      return {
        [FORM_ERROR]: isUndefined(e.message) ? 'unknown error' : e.message
      };
    }
  }, [trigger, redirectToLogin, ct]);
  return {
    ...result,
    data: result.data || null,
    error: result.error ? convertApolloError2Errors(result.error) : null,
    trigger,
    submit
  }
}
