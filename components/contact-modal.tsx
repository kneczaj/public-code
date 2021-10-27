import React from 'react';
import { useCT } from 'public/hooks/translation';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { SimpleDialogProps } from 'public/providers/dialog-provider';
import { CompanyDetails } from 'public/providers/company-details-provider';

export function Contact({ id, close }: SimpleDialogProps): JSX.Element {
  const ct = useCT();
  const { address, contactEmail, companyName, nip, regon } =
    CompanyDetails.useContext();

  return (
    <Dialog open={true} onClose={close} id={id}>
      <DialogTitle>{ct('contact')}</DialogTitle>
      <DialogContent>
        <h3 itemProp={'company'}>{companyName}</h3>
        <div>
          <div itemProp={'address'}>
            {address.map((line, idx) => (
              <div key={idx}>{line}</div>
            ))}
          </div>
          <div>NIP: {nip}</div>
          <div>REGON: {regon}</div>
        </div>
        <p>
          <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
        </p>
      </DialogContent>
      <DialogActions>
        <Button onClick={close} color='primary' autoFocus>
          {ct('close')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
