import React from "react";
import { isUndefined } from "../../util";
import { useCommonFieldContext } from "../hooks/field-context";

export interface Props {
}

export function FieldLabel(props: Props) {
  // empty string should also return nothing
  const { id, label } = useCommonFieldContext();
  if (isUndefined(label)) {
    return null;
  }
  return <label htmlFor={id}>{label}</label>;
}
