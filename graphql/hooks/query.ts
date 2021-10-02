import { useQuery as useQueryBase } from "@apollo/client";
import { OperationVariables } from "@apollo/client/core";
import { DocumentNode } from "graphql";
import { TypedDocumentNode } from "@graphql-typed-document-node/core";
import { QueryHookOptions } from "@apollo/client/react/types/types";
import { isNullOrUndefined, isUndefined } from "public/util";
import { convertApolloError2Errors } from "public/graphql/utils";
import { Errors, mergeErrors } from "public/requests/models/errors";
import { QueryResult } from "public/graphql/models";

export function useQuery<TData = any, TVariables = OperationVariables>(query: DocumentNode | TypedDocumentNode<TData, TVariables>, options?: QueryHookOptions<TData, TVariables>): QueryResult<TData, TVariables> {
  const response = useQueryBase(query, options);
  const baseErrors: Errors | null = isUndefined(response.error)
    ? null
    : convertApolloError2Errors(response.error);
  const error: Errors | null = isNullOrUndefined(response.data)
    ? mergeErrors([baseErrors, {
      messages: [`Empty response from server`]
    }])
    : baseErrors;
  return {
    ...response,
    data: response.data || null,
    error: error || null
  }
}
