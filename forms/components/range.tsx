import React from 'react';
import { capitalizeFirstLetter } from '../../util';
import { useT } from '../../hooks/translation';
import { CustomInput } from 'public/forms/hooks/field';
import { RangeDataFormat } from 'public/forms/models/range';

/**
 * Custom props for exactly this input
 */
export interface CustomProps {
  children: {
    minField: (
      name: string,
      wrapperClassName: string,
      placeholder: string
    ) => JSX.Element;
    maxField: (
      name: string,
      wrapperClassName: string,
      placeholder: string
    ) => JSX.Element;
  };
}

/**
 * These include props passed from useField
 */
export interface Props
  extends CustomProps,
    CustomInput<RangeDataFormat<number>, HTMLElement> {}

export function Range({
  children: { minField, maxField },
  ...input
}: Props): JSX.Element {
  const t = useT();
  return (
    <div className={'form-row'} style={{ alignItems: 'baseline' }} {...input}>
      {minField(
        `${input.name}.min`,
        'flex-grow-1',
        capitalizeFirstLetter(t('from'))
      )}
      {maxField(
        `${input.name}.max`,
        'flex-grow-1',
        capitalizeFirstLetter(t('upto'))
      )}
    </div>
  );
}
