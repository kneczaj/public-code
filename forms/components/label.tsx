import { useSingleFieldContext } from "../hooks/field-context";
import { isUndefined } from "../../util";

export interface Props {}

export function Label(props: Props) {
  const { input: { value } } = useSingleFieldContext();
  if (isUndefined(value)) {
    return null;
  }
  return value;
}
