import React from 'react';
import { useHistory } from '../hooks/history';
import { Redirect as RedirectBase, RedirectProps } from 'react-router-dom';
import { getLocationObj, LocationDescriptor, UpdateSearch } from '../models';
import { StringifiableRecord } from 'query-string';

export interface Props<LocationState, Search>
  extends Omit<RedirectProps, 'to'> {
  to: LocationDescriptor<LocationState>;
  updateSearch?: UpdateSearch<Search>;
}

/**
 * Takes care of proper updating search string on redirects
 *
 * By default if push handler does not passes `updateSearch` arg it preserves the current one.
 */
export function Redirect<LocationState, Search extends StringifiableRecord>({
  to,
  updateSearch,
  ...rest
}: Props<LocationState, Search>) {
  const { location } = useHistory<LocationState, Search>();
  return (
    <RedirectBase
      to={getLocationObj<LocationState, Search>(
        to,
        location.search,
        updateSearch
      )}
      {...rest}
    />
  );
}
