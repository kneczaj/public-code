import React from 'react';
import { Slider, SliderTypeMap } from '@material-ui/core';
import { useField } from 'react-final-form';
import { isUndefined } from '../../util';
import { useT } from '../../hooks/translation';
import { CustomInput } from 'public/forms/hooks/field';
import { RangeDataFormat } from 'public/forms/models/range';

export type Props = CustomInput<RangeDataFormat<number>, HTMLInputElement> &
  SliderTypeMap<any>['props'];
type ValueLabelFormat = (value: number, index: number) => React.ReactNode;

export function SliderRange({ name, ...props }: Props): JSX.Element {
  const minField = useField(`${name}.min`);
  const maxField = useField(`${name}.max`);
  const t = useT();
  function onChange(event: React.ChangeEvent<any>, val: [number, number]) {
    const newMax = val[1] === props.max ? undefined : val[1];
    const newMin = val[0] === props.min ? undefined : val[0];
    minField.input.onChange(newMin);
    maxField.input.onChange(newMax);
  }
  const minVal =
    minField.input.value === props.min || minField.input.value === ''
      ? undefined
      : minField.input.value;
  const maxVal =
    maxField.input.value === props.max || maxField.input.value === ''
      ? undefined
      : maxField.input.value;
  return (
    <>
      <Slider
        {...props}
        value={[
          isUndefined(minVal) ? props.min : minVal,
          isUndefined(maxVal) ? props.max : maxVal
        ]}
        onChange={
          onChange as (
            event: React.ChangeEvent<any>,
            val: number | number[]
          ) => void
        }
      />
      <div
        className={'d-flex justify-content-between'}
        style={{ fontSize: '0.85em' }}
      >
        <div>{`${t('from')} ${(props.valueLabelFormat as ValueLabelFormat)(
          isUndefined(minVal) ? props.min : minVal,
          0
        )}`}</div>
        <div>
          {isUndefined(maxVal)
            ? t('no limits')
            : `${t('upto')} ${(props.valueLabelFormat as ValueLabelFormat)(
                maxVal,
                1
              )}`}
        </div>
      </div>
    </>
  );
}

SliderRange.defaultProps = {
  valueLabelFormat: (x: any) => x
};
