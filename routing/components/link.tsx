import React, { forwardRef, MutableRefObject } from 'react';
import { Link as ReactLink, LinkProps } from 'react-router-dom';
import { getLocationObj, LocationDescriptor, UpdateSearch } from '../models';
import { useHistory } from '../hooks/history';
import { StringifiableRecord } from 'query-string';
import { Link as LinkBase } from '@material-ui/core';

export type PropsBase<S> = LinkProps<S> &
  React.RefAttributes<HTMLAnchorElement>;

export interface Props<LocationState, Search>
  extends Omit<PropsBase<LocationState>, 'to'> {
  to: LocationDescriptor<LocationState>;
  updateSearch?: UpdateSearch<Search>;
}

export function LinkWithoutRef<
  LocationState,
  Search extends StringifiableRecord
>(
  { to, updateSearch, ...rest }: Props<LocationState, Search>,
  ref?:
    | ((instance: HTMLAnchorElement | null) => void)
    | MutableRefObject<HTMLAnchorElement | null>
    | null
): JSX.Element {
  const { location } = useHistory<LocationState, Search>();
  return (
    <LinkBase
      ref={ref}
      component={ReactLink}
      to={getLocationObj<LocationState, Search>(
        to,
        location.search,
        updateSearch
      )}
      {...(rest as any)}
      color={'initial'}
    />
  );
}

export const Link = forwardRef<HTMLAnchorElement, Props<any, any>>(
  LinkWithoutRef
);
