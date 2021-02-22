/**
 * Used to remove typename property from objects
 * File content SOURCE:
 * https://github.com/apollographql/apollo-feature-requests/issues/6#issuecomment-659596763
 */
import { ApolloLink } from '@apollo/client';

const isFile = (value: unknown) =>
  (typeof File !== 'undefined' && value instanceof File) ||
  (typeof Blob !== 'undefined' && value instanceof Blob);

// From https://gist.github.com/Billy-/d94b65998501736bfe6521eadc1ab538
const omitDeep = (value: any, key: any): any => {
  if (Array.isArray(value)) {
    return value.map(i => omitDeep(i, key));
  } else if (typeof value === 'object' && value !== null && !isFile(value)) {
    return Object.keys(value).reduce((newObject, k) => {
      if (k === key) return newObject;
      return Object.assign({ [k]: omitDeep(value[k], key) }, newObject);
    }, {});
  }
  return value;
};

export const omitTypenameLink = new ApolloLink((operation, forward) => {
  if (operation.variables) {
    operation.variables = omitDeep(operation.variables, '__typename');
  }
  return forward(operation);
});
