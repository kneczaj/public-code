import * as FormContext from "public/forms/form-name-context";
import { mockHook } from "./utils";
import * as Translation from "public/hooks/translation";
import * as UserProvider from "public/auth/components/user-provider";
import * as OfferQuery from "app/root/query-provider/query-context";
import { user } from "./consts";
import { Query as QueryModel } from "../../app/ads-browser/models/query";

export const useT = mockHook(Translation, 'useT', (input: string) => input);
export const useFormName = mockHook(FormContext, "useFormName", "testform");
export const useUser = mockHook<typeof UserProvider.useUser, 'useUser', typeof UserProvider>(
  UserProvider, 'useUser', {
    user,
    isAuthenticated: true,
    logout: () => undefined,
    login: user => undefined
  });

export const useOfferQuery = mockHook(OfferQuery, 'useOfferQuery', {
  value: null,
  save: (query: QueryModel, redirectUrl?: string) => undefined
});
