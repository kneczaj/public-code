import { useMutation } from "@apollo/client";
import { useMemo } from "react";
import { FinalFormSubmissionResult, makeMutationRequest } from "../utils";
import { MutationHookOptions, MutationResult } from "@apollo/client/react/types/types";
import { DocumentNode } from "graphql";
import { TypedDocumentNode } from "@graphql-typed-document-node/core";

export type Hook<TData, FormValues> = [
  (variables: FormValues) => Promise<FinalFormSubmissionResult<FormValues>>,
  MutationResult<TData>
]

export interface CustomMutationOptions<TData, FormValues> extends MutationHookOptions<TData, FormValues> {
  onSuccess?: (data: TData) => void,
  onError?: (e: any) => void
}

/**
 * Integrates GraphQL with response format needed by final-form
 * @param mutation
 * @param options
 */
export function useFormMutation<TData, FormValues>(
  mutation: DocumentNode | TypedDocumentNode<TData, FormValues>,
  options?: CustomMutationOptions<TData, FormValues>
): Hook<TData, FormValues> {
  const { onSuccess, onError, ...optionsRest } = options || {};
  const [triggerFn, result] = useMutation<TData, FormValues>(mutation, optionsRest);
  const trigger = useMemo(() => makeMutationRequest<TData, FormValues>(
    triggerFn,
    onSuccess,
    onError
  ), [triggerFn, onError, onSuccess]);
  return [
    trigger,
    result
  ];
}
