export * from '@apollo/client';

/**
 * This file exports overwritten apollo client to match the project requirements and to be used with generated GraphQL
 * code.
 */

export { useMutation } from 'public/graphql/hooks/mutation';
export { useQuery } from 'public/graphql/hooks/query';
export type { FetchResult, MutationResult, QueryResult } from 'public/graphql/models';
