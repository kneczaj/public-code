import { StringifiableRecord } from "query-string";

export interface Redirect extends StringifiableRecord {
  from?: string;
}
