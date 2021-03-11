import React from 'react';
import { useCT } from '../hooks/translation';
import { CONTACT_EMAIL } from '../config';
import { useModal } from './hooks';
import { DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import Button from '@material-ui/core/Button';

export function Contact(): JSX.Element {
  const ct = useCT();
  const { closeModal } = useModal();

  return (
    <>
      <DialogTitle>{ct('contact')}</DialogTitle>
      <DialogContent>
        <h3 itemProp={'company'}>Gryfny Team Sp. z o.o.</h3>
        <div>
          <div itemProp={'address'}>
            <div>Rynek Główny 28</div>
            <div>31-010 Kraków</div>
          </div>
          <div>NIP: 6762568340</div>
          <div>REGON: 38387064900000</div>
        </div>
        <p>
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
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
