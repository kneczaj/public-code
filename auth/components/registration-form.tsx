import React from "react";
import { InputField } from "../../forms/fields/input-field";
import { composeValidators, isEmail, required } from "../../forms/validation";
import { CheckboxField } from "../../forms/fields/checkbox-field";
import { FormRenderProps } from "react-final-form";
import { Form } from "../../forms/components/form";
import { capitalizeFirstLetter, isUndefined } from "../../util";
import { useT } from "../../hooks/translation";
import { Button, Grid, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useUserApi } from "public/auth/providers/user-provider";
import { FORM_ERROR } from "final-form";
import { RegisterMutationVariables } from "generated/graphql";

export interface Props {
  children?: any;
  confirmButtonLabel?: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  submit: {
    margin: theme.spacing(3, 0, 1),
  },
}));

export interface RegistrationFormPayload extends RegisterMutationVariables {
  password2: string;
  terms: boolean;
  privacyPolicy: boolean;
}

export function RegistrationForm({children, confirmButtonLabel}: Props) {
  const t = useT();
  const classes = useStyles();
  const {register} = useUserApi();

  function validate(values: RegistrationFormPayload) {
    if (values.password1 !== values.password2) {
      return {[FORM_ERROR]: 'passwords do not match'};
    }
    return undefined;
  }

  return (
    <Form
      formName={'register'}
      className={'registration-form-root'}
      onSubmit={register}
      validate={validate}
    >{{
      main: () =>
        <>
          <Grid container spacing={2} alignContent={"stretch"} direction={"column"}>
            <Grid item>
              <InputField
                name={'email'}
                showLabel={false}
                placeholder={capitalizeFirstLetter(t('email'))}
                validate={composeValidators([isEmail])}
                fullWidth
                variant={'outlined'}
              />
            </Grid>
            <Grid item>
              <InputField
                name={'password1'}
                showLabel={false}
                type={'password'}
                placeholder={capitalizeFirstLetter(t('password1'))}
                fullWidth
                variant={'outlined'}
              />
            </Grid>
            <Grid item>
              <InputField
                name={'password2'}
                showLabel={false}
                type={'password'}
                placeholder={capitalizeFirstLetter(t('password2'))}
                fullWidth
                variant={'outlined'}
              />
            </Grid>
            <Grid item container spacing={0} alignContent={"stretch"} direction={"column"}>
              <Grid item>
                <CheckboxField
                  size={'small'}
                  name={'terms'}
                  validate={required}
                />
              </Grid>
              <Grid item>
                <CheckboxField name={'privacyPolicy'} size={'small'} validate={required}/>
              </Grid>
            </Grid>
          </Grid>
          {children}
        </>,
      footer: ({values}: FormRenderProps) =>
        <Button
          className={classes.submit}
          type={'submit'}
          color={'primary'}
          disabled={!values.email || !values.password1 || !values.password2}
          fullWidth
          variant={"contained"}
        >
          {isUndefined(confirmButtonLabel) ? capitalizeFirstLetter(t('register')) : confirmButtonLabel}
        </Button>
    }}</Form>
  );
}
