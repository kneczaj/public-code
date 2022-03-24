import React from 'react';
import { useCT } from 'public/hooks/translation';
import { DialogContent, DialogTitle } from '@material-ui/core';
import { SimpleDialog, SimpleDialogProps } from 'public/dialogs/SimpleDialog';
import { useCompanyDetails } from 'public/providers/company-details-provider';

export function Contact(props: SimpleDialogProps): JSX.Element {
  const ct = useCT();
  const { address, contactEmail, companyName, nip, regon } =
    useCompanyDetails();

  return (
    <SimpleDialog {...props}>
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
    </SimpleDialog>
  );
}
