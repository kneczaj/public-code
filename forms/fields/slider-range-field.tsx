import React from 'react';
import { Field } from '../components/field';
import { SliderRange } from '../components/slider-range';
import { BaseOuterProps } from '../models/field';
import { RangeDataFormat } from '../models/range';
import { composeValidators, rangeValidator } from '../validation';
import { SliderTypeMap } from '@material-ui/core';

export type Props = SliderTypeMap<BaseOuterProps<RangeDataFormat>>['props'];

export function SliderRangeField({
  validate,
  min,
  max,
  step,
  valueLabelFormat,
  color,
  ...props
}: Props) {
  const innerProps = {
    min,
    max,
    step,
    valueLabelFormat,
    color
  };
  return (
    <Field {...props} validate={composeValidators([validate, rangeValidator])}>
      <SliderRange {...innerProps} />
    </Field>
  );
}

SliderRangeField.defaultProps = {
  color: 'secondary'
};
