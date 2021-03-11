import React from 'react';
import { useCT } from '../hooks/translation';
import { useModal } from './hooks';
import { DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import Button from '@material-ui/core/Button';

export function Licenses(): JSX.Element {
  const ct = useCT();
  const { closeModal } = useModal();

  return (
    <>
      <DialogTitle>{ct('licenses')}</DialogTitle>
      <DialogContent>
        <h3>Logo</h3>
        <p>
          Żaba użyta w logo jest licencjonowana na{' '}
          <a
            href={'https://creativecommons.org/licenses/by/4.0/deed.pl'}
            target={'_blank'}
            rel='noopener noreferrer'
          >
            Creative Commons BY 4.0
          </a>
          , źrodło:{' '}
          <a
            href={
              'https://www.svgrepo.com/svg/263334/frog?fbclid=IwAR3nDDCW7VHHVaIY4CyUkV5wa5u7yr6Qx9LsQTjWz4GBm7UzZBZPzfDzlYU'
            }
            rel='noopener noreferrer'
          >
            svgrepo.com
          </a>
          . Nie została poddana żadnym modyfikacjom.
        </p>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeModal} color='primary' autoFocus>
          {ct('close')}
        </Button>
      </DialogActions>
    </>
  );
}
