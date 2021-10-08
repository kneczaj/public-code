import {
  ComponentGeneralRange,
  Filter as FilterBase,
  Maybe,
  UsersPermissionsRole,
  UsersPermissionsUser
} from 'generated/graphql';

export type Filter = NonNullable<Pick<FilterBase, 'id' | 'name' | 'area'>> & {
  pricePerSquareMeter: Maybe<Pick<ComponentGeneralRange, 'min' | 'max'>>;
  size: Maybe<Pick<ComponentGeneralRange, 'min' | 'max'>>;
  price: Maybe<Pick<ComponentGeneralRange, 'min' | 'max'>>;
};

export type User = Pick<
  UsersPermissionsUser,
  'id' | 'username' | 'email' | 'confirmed' | 'blocked'
> & {
  role: Maybe<Pick<UsersPermissionsRole, 'name'>>;
  currentFilter: Maybe<Filter>;
};

export function getInitialState(): string | null {
  return localStorage.getItem('token') || null;
}
