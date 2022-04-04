import React from 'react';
import { InputField } from '../../forms/fields/input-field';
import { composeValidators, isEmail } from '../../forms/validation';
import { FormRenderProps } from 'react-final-form';
import { Form } from '../../forms/components/form';
import { capitalizeFirstLetter } from '../../util';
import { useT } from '../../hooks/translation';
import { Button, Grid, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useAuth } from 'public/auth/providers/auth-provider';
import { LoginMutationVariables } from 'generated/graphql';

export interface Props {
  children?: React.ReactNode;
  confirmButtonLabel?: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  submit: {
    margin: theme.spacing(3, 0, 1)
  }
}));

export function LoginForm({
  children,
  confirmButtonLabel
}: Props): JSX.Element {
  const t = useT();
  const classes = useStyles();
  const { login } = useAuth();

  return (
    <Form<LoginMutationVariables>
      formName={'login'}
      onSubmit={login}
      Footer={({ values }: FormRenderProps<LoginMutationVariables>) => (
        <Button
          className={classes.submit}
          type={'submit'}
          fullWidth
          variant={'contained'}
          disabled={!values.username || !values.password}
        >
          {confirmButtonLabel || capitalizeFirstLetter(t('login'))}
        </Button>
      )}
    >
      <>
        <Grid
          container
          spacing={2}
          alignContent={'stretch'}
          direction={'column'}
        >
          <Grid item>
            <InputField
              name={'username'}
              showLabel={false}
              placeholder={capitalizeFirstLetter(t('username'))}
              validate={composeValidators([isEmail])}
              variant={'outlined'}
              fullWidth
            />
          </Grid>
          <Grid item>
            <InputField
              name={'password'}
              showLabel={false}
              placeholder={capitalizeFirstLetter(t('password'))}
              type={'password'}
              variant={'outlined'}
              fullWidth
            />
          </Grid>
          {children && <div className={'agreements'}>{children}</div>}
        </Grid>
      </>
    </Form>
  );
}
