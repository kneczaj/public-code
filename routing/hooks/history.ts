import { useHistory as useHistoryBase, useLocation } from 'react-router';
import { History } from 'history';
import { parse, StringifiableRecord } from 'query-string';
import { useMemo } from 'react';
import {
  CustomLocation,
  getLocationObj,
  LocationDescriptorObject,
  UpdateSearch
} from '../models';

export interface Hook<LocationState, Search>
  extends Omit<History<LocationState>, 'location' | 'push'> {
  location: CustomLocation<LocationState, Search>;
  /**
   * Updates `search` by a separate function to prevent loosing current state
   * @param location
   * @param updateSearch
   */
  push: (
    location: string | LocationDescriptorObject<LocationState>,
    updateSearch?: UpdateSearch<Search>
  ) => void;
}

/**
 * This useHistory wrapper takes care of converting url search part from and to object in contrary to useHistoryBase
 * which keeps it in string.
 *
 * By default if push handler does not passes `updateSearch` arg it preserves the current one.
 */
export function useHistory<
  LocationState,
  Search extends StringifiableRecord
>(): Hook<LocationState, Search> {
  // NOTE: location taken from useHistoryBase hook does not rerender components on url change
  const history = useHistoryBase<LocationState>();
  const location = useLocation<LocationState>();
  const searchString = location.search;
  const search = useMemo(() => (parse(searchString) as unknown) as Search, [
    searchString
  ]);
  return {
    ...history,
    location: {
      ...location,
      search,
      searchString
    },
    push: (location, updateSearch) => {
      history.push(
        getLocationObj<LocationState, Search>(location, search, updateSearch)
      );
    }
  };
}
