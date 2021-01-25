import React, { useEffect } from "react";
import { InputField } from "../../forms/fields/input-field";
import { composeValidators, isEmail } from "../../forms/validation";
import { FormRenderProps } from "react-final-form";
import { Form } from "../../forms/components/form";
import { LoginQueryPayload, LoginResponsePayload } from "../models/login";
import { capitalizeFirstLetter, isNullOrUndefined } from "../../util";
import { useT } from "../../hooks/translation";
import { Button, Grid, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { gql } from "@apollo/client";
import { useFormMutation } from "../../graphql/hooks/form-mutation";

const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(
      input: {
        identifier: $username,
        password: $password
      }
    ) {
      user {
        email
      },
      jwt
    }
  }
`;

export interface Props {
  onSuccess: (token: string) => void;
  onError: (error: any) => void;
  children?: any;
  confirmButtonLabel?: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  submit: {
    margin: theme.spacing(3, 0, 1),
  },
}));

export function LoginForm({ children, confirmButtonLabel, onError, onSuccess }: Props) {
  const t = useT();
  const classes = useStyles();
  const [ onLogin, { data } ] = useFormMutation<LoginResponsePayload, LoginQueryPayload>(LOGIN, {
    onError
  });
  useEffect(() => {
    if (isNullOrUndefined(data)) {
      return;
    }
    onSuccess(data.login.jwt)
  }, [data, onSuccess])

  return (
    <Form
      formName={'login'}
      onSubmit={onLogin}
    >{{
      main: () =>
        <>
          <Grid container spacing={2} alignContent={"stretch"} direction={"column"}>
            <Grid item>
              <InputField
                name={'username'}
                showLabel={false}
                placeholder={capitalizeFirstLetter(t('username'))}
                validate={composeValidators([isEmail])}
                variant={"outlined"}
                fullWidth
              />
            </Grid>
            <Grid item>
              <InputField
                name={'password'}
                showLabel={false}
                placeholder={capitalizeFirstLetter(t('password'))}
                type={'password'}
                variant={"outlined"}
                fullWidth
              />
            </Grid>
            {children && <div className={'agreements'}>
              {children}
            </div>}
          </Grid>
        </>,
      footer: ({ values }: FormRenderProps) =>
        <Button
          className={classes.submit}
          type={'submit'}
          fullWidth
          variant={"contained"}
          disabled={!values.username || !values.password}
        >
          {confirmButtonLabel || capitalizeFirstLetter(t('login'))}
        </Button>
    }}</Form>
  )
}
