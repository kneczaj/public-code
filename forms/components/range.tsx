import React from 'react';
import { capitalizeFirstLetter } from '../../util';
import { FormGroupWrapper } from './form-group-wrapper';
import { useSingleFieldContext } from '../hooks/field-context';
import { useT } from '../../hooks/translation';

export interface Props {
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

export function Range({ children: { minField, maxField } }: Props) {
  const {
    id,
    input: { name }
  } = useSingleFieldContext();
  const t = useT();
  return (
    <FormGroupWrapper className={'mb-0'}>
      <div className={'form-row'} style={{ alignItems: 'baseline' }} id={id}>
        {minField(
          `${name}.min`,
          'flex-grow-1',
          capitalizeFirstLetter(t('from'))
        )}
        {maxField(
          `${name}.max`,
          'flex-grow-1',
          capitalizeFirstLetter(t('upto'))
        )}
      </div>
    </FormGroupWrapper>
  );
}
