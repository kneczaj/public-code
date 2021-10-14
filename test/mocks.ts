import { FetchResult } from '@apollo/client/link/core';
import { MutationFunctionOptions } from '@apollo/client/react/types/types';
import { GraphQLError } from 'graphql/error/GraphQLError';
import { FinalFormSubmissionResult } from 'public/graphql/utils';
import { FORM_ERROR } from 'final-form';

function any(): any {
  return Symbol() as any;
}

export const anyGQLData: any = {
  a: 'a string',
  b: 50
};

export const fetchResultDataOnly: FetchResult = {
  data: any()
};

export const fetchResultAllFieldsSuccess: FetchResult = {
  data: any(),
  context: any(),
  extensions: any()
};

export const unathorizedError: GraphQLError = {
  message: 'Invalid token.',
  locations: [{ line: 2, column: 3 }],
  path: ['login'],
  extensions: {
    code: 'INTERNAL_SERVER_ERROR',
    exception: {
      isBoom: true,
      isServer: false,
      data: null,
      output: {
        statusCode: 401,
        payload: {
          statusCode: 401,
          error: 'Unauthorized',
          message: 'Invalid token.'
        },
        headers: {}
      },
      stacktrace: [
        'Error: Invalid token.',
        '    at /app/node_modules/strapi-plugin-users-permissions/services/Jwt.js:58:27',
        '    at /app/node_modules/jsonwebtoken/verify.js:152:16',
        '    at getSecret (/app/node_modules/jsonwebtoken/verify.js:90:14)',
        '    at Object.module.exports [as verify] (/app/node_modules/jsonwebtoken/verify.js:94:10)',
        '    at /app/node_modules/strapi-plugin-users-permissions/services/Jwt.js:52:11',
        '    at new Promise (<anonymous>)',
        '    at Object.verify (/app/node_modules/strapi-plugin-users-permissions/services/Jwt.js:51:12)',
        '    at Object.getToken (/app/node_modules/strapi-plugin-users-permissions/services/Jwt.js:38:17)',
        '    at module.exports (/app/node_modules/strapi-plugin-users-permissions/config/policies/permissions.js:15:77)',
        '    at dispatch (/app/node_modules/koa-compose/index.js:42:32)',
        '    at /app/node_modules/strapi-utils/lib/policy.js:68:11',
        '    at dispatch (/app/node_modules/koa-compose/index.js:42:32)',
        '    at /app/node_modules/koa-compose/index.js:34:12',
        '    at /app/node_modules/strapi-plugin-graphql/services/resolvers-builder.js:36:13',
        '    at field.resolve (/app/node_modules/graphql-extensions/dist/index.js:134:26)',
        '    at field.resolve (/app/node_modules/apollo-server-core/dist/utils/schemaInstrumentation.js:52:26)',
        '    at resolveField (/app/node_modules/graphql/execution/execute.js:466:18)',
        '    at /app/node_modules/graphql/execution/execute.js:263:18',
        '    at /app/node_modules/graphql/jsutils/promiseReduce.js:23:10',
        '    at Array.reduce (<anonymous>)',
        '    at promiseReduce (/app/node_modules/graphql/jsutils/promiseReduce.js:20:17)',
        '    at executeFieldsSerially (/app/node_modules/graphql/execution/execute.js:260:37)',
        '    at executeOperation (/app/node_modules/graphql/execution/execute.js:238:55)',
        '    at executeImpl (/app/node_modules/graphql/execution/execute.js:118:14)',
        '    at Object.execute (/app/node_modules/graphql/execution/execute.js:62:35)',
        '    at /app/node_modules/apollo-server-core/dist/requestPipeline.js:249:48',
        '    at Generator.next (<anonymous>)',
        '    at /app/node_modules/apollo-server-core/dist/requestPipeline.js:8:71'
      ]
    }
  }
} as unknown as GraphQLError; // this is a real response from our API

export const unauthorizedFormError: FinalFormSubmissionResult<any> = {
  [FORM_ERROR]: 'Invalid token.'
};

export const errorResponse1: FetchResult = {
  errors: [unathorizedError],
  data: null
};

export const getMutation: <TData, FormValues>(
  options?: MutationFunctionOptions<TData, FormValues>
) => Promise<FetchResult<TData>> = jest.fn();
