import React, { useEffect, useState } from 'react';
import { useHistory } from 'public/routing/hooks/history';
import { useAuth } from 'public/auth/providers/auth-provider';
import { getBackendUrl } from 'app/root/models/urls';

export interface Props {
  providerName: string;
}

export function LoginRedirect({ providerName }: Props): JSX.Element {
  const [text, setText] = useState('Loading...');
  const {
    push,
    location: { searchString }
  } = useHistory();
  const { login } = useAuth();

  useEffect(() => {
    async function loginToStrapy() {
      const data: any = await (
        await fetch(
          getBackendUrl(`/auth/${providerName}/callback${searchString}`)
        )
      ).json();
      // Successfully logged with Strapi
      // Now saving the jwt to use it for future authenticated requests to Strapi
      await login(data.jwt); // TODO
      console.log(data);
    }

    // Successfully logged with the provider
    // Now logging with strapi by using the access_token (given by the provider) in props.location.search
    try {
      loginToStrapy().then();
      setText(
        'You have been successfully logged in. You will be redirected in a few seconds...'
      );
      setTimeout(() => push('/'), 3000); // Redirect to homepage after 3 sec
    } catch (err) {
      console.log(err);
      setText('An error occurred, please see the developer console.');
    }
    // eslint-disable-next-line
  }, [setText, push, providerName]);

  return <p>{text}</p>;
}
