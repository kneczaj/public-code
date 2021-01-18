import React from "react";
import { Slider, SliderTypeMap } from "@material-ui/core";
import { useSingleFieldContext } from "../hooks/field-context";
import { useField } from "react-final-form";
import { FormGroupWrapper } from "./form-group-wrapper";
import { isUndefined } from "../../util";
import { useT } from "../../hooks/translation";

export type Props = SliderTypeMap<{}>['props'];

export function SliderRange(props: Props) {
  const { id, input: { name } } = useSingleFieldContext();
  const minField = useField(`${name}.min`);
  const maxField = useField(`${name}.max`);
  const t = useT();
  function onChange(event: React.ChangeEvent<{}>, val: [number, number]) {
    const newMax = val[1] === props.max ? undefined : val[1];
    const newMin = val[0] === props.min ? undefined : val[0];
    minField.input.onChange(newMin);
    maxField.input.onChange(newMax);
  }
  const minVal = minField.input.value === props.min || minField.input.value === '' ? undefined : minField.input.value;
  const maxVal = maxField.input.value === props.max || maxField.input.value === '' ? undefined : maxField.input.value;
  return (
    <FormGroupWrapper>
      <Slider
        id={id}
        value={[isUndefined(minVal) ? props.min : minVal, isUndefined(maxVal) ? props.max : maxVal]}
        onChange={onChange as (event: React.ChangeEvent<{}>, val: number | number[]) => void}
        {...props}
      />
      <div className={'d-flex justify-content-between'} style={{ fontSize: '0.85em' }}>
        <div>{`${t('from')} ${(props.valueLabelFormat as Function)(isUndefined(minVal) ? props.min : minVal)}`}</div>
        <div>{isUndefined(maxVal) ? t('no limits') : `${t('upto')} ${(props.valueLabelFormat as Function)(maxVal)}`}</div>
      </div>
    </FormGroupWrapper>
  );
}

SliderRange.defaultProps = {
  valueLabelFormat: (x: any) => x
};
