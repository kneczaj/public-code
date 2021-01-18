import { FieldRenderProps, useField as useFieldBase, UseFieldConfig as UseFieldConfigBase } from "react-final-form";
import { isUndefined } from "../../util";
import { useMemo } from "react";

export interface UseFieldConfig<FieldValue> extends Omit<UseFieldConfigBase<FieldValue>, 'formatOnBlur'> {
  formatOnBlur?: UseFieldConfigBase<FieldValue>['format'];
}

export function useFieldFormatOnBlur<FieldValue = any, T extends HTMLElement = HTMLElement>(
  name: string,
  config?: UseFieldConfig<FieldValue>
): FieldRenderProps<FieldValue, T> {
  const configResult: UseFieldConfigBase<FieldValue> | undefined = useMemo(() => {
    if (isUndefined(config)) {
      return undefined;
    }
    const { formatOnBlur, ...configRest } = config;
    if (isUndefined(formatOnBlur)) {
      return configRest;
    }
    return {
      ...configRest,
      formatOnBlur: true,
      // the inner useField takes care of formatting on blur
      format: formatOnBlur
    }
  }, [config]);

  const baseResult = useFieldBase(name, configResult);
  if (isUndefined(configResult) || isUndefined(configResult.formatOnBlur)) {
    return baseResult;
  }

  const {
    format: formatBase = (value: FieldValue) => value
  } = configResult;

  return {
    ...baseResult,
    input: {
      ...baseResult.input,
      get value() {
        // the wrapper takes care of formatting on keypress
        // this is similar to how the final form works for keypress formatting
        return formatBase(baseResult.input.value, name)
      }
    }
  }
}
