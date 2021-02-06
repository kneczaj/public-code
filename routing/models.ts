import { Location, Path } from 'history';
import { isUndefined } from '../util';
import { StringifiableRecord, stringify } from 'query-string';
import { LocationDescriptorObject as LocationDescriptorObjectBase } from 'history';

export interface CustomLocation<LocationState, Search>
  extends Omit<Location<LocationState>, 'search'> {
  search: Search;
  searchString: string;
}

export type LocationDescriptorObject<LocationState> = Omit<
  Partial<Location<LocationState>>,
  'search'
>;
export type LocationDescriptor<LocationState> =
  | Path
  | LocationDescriptorObject<LocationState>;
export type UpdateSearch<Search> = (currentSearch: Search) => Search;

export function getLocationObj<
  LocationState,
  Search extends StringifiableRecord
>(
  location: LocationDescriptor<LocationState>,
  currentSearch: Search,
  updateSearch?: UpdateSearch<Search>
): LocationDescriptorObjectBase<LocationState> {
  const obj = typeof location === 'string' ? { pathname: location } : location;
  return {
    ...obj,
    search: isUndefined(updateSearch)
      ? stringify(currentSearch)
      : stringify(updateSearch(currentSearch))
  };
}
