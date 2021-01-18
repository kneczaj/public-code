import React from "react";
import { InputField } from "../../forms/fields/input-field";
import { composeValidators, isEmail } from "../../forms/validation";
import { CheckboxField } from "../../forms/fields/checkbox-field";
import { FormRenderProps } from "react-final-form";
import { Form } from "../../forms/components/form";
import { RegisterQueryPayload, RegisterResponsePayload } from "../models/register";
import { capitalizeFirstLetter, isUndefined } from "../../util";
import { useT } from "../../hooks/translation";
import { Button, Grid, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { gql, useMutation } from "@apollo/client";
import { FORM_ERROR } from "final-form";

const REGISTER = gql`
  mutation Register($email: String!, $password1: String!) {
    register(
      input: {
        email: $email,
        username: $email
        password: $password1
      }
    ) {
      user {
        username
      }
    }
  }
`;

export interface Props {
  children?: any;
  confirmButtonLabel?: string;
  onSuccess: (payload: RegisterResponsePayload, username: string) => void;
  onError: (error: any) => void;
}

const useStyles = makeStyles((theme: Theme) => ({
  submit: {
    margin: theme.spacing(3, 0, 1),
  },
}));

export function RegistrationForm({ children, confirmButtonLabel, onSuccess }: Props) {
  const t = useT();
  const classes = useStyles();
  const [register] = useMutation(REGISTER);

  async function onSubmit(
    formState: RegisterQueryPayload,
  ): Promise<any /* validation error */> {
    try {
      const response = await register(
        { variables: formState }
      );
      if (response.errors) {
        return { [FORM_ERROR]: response.errors[0].message }
      }
      onSuccess(response.data, formState.email);
    } catch (e) {}
  }

  return (
    <Form
      formName={'register'}
      className={'registration-form-root'}
      onSubmit={onSubmit}
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
                />
              </Grid>
              <Grid item>
                <CheckboxField name={'privacyPolicy'} size={'small'}/>
              </Grid>
            </Grid>
          </Grid>
          {children}
        </>,
      footer: ({ values }: FormRenderProps) =>
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
