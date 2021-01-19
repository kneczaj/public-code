import {useMutation} from "@apollo/client";
import {useMemo} from "react";
import {FinalFormSubmissionMutationResult, makeMutationRequest} from "../utils";
import {MutationHookOptions, MutationResult} from "@apollo/client/react/types/types";
import {DocumentNode} from "graphql";
import {TypedDocumentNode} from "@graphql-typed-document-node/core";

export type Hook<TData, FormValues> = [
  (variables: FormValues) => Promise<FinalFormSubmissionMutationResult<TData, FormValues>>,
  MutationResult<TData>
]

/**
 * Integrates GraphQL with response format needed by final-form
 * @param mutation
 * @param options
 */
export function useFormMutation<TData, FormValues>(
  mutation: DocumentNode | TypedDocumentNode<TData, FormValues>,
  options?: MutationHookOptions<TData, FormValues>
): Hook<TData, FormValues> {
  const [triggerFn, result] = useMutation<TData, FormValues>(mutation, options);
  const trigger = useMemo(() => makeMutationRequest<TData, FormValues>(triggerFn), [triggerFn]);
  return [trigger, result];
}
