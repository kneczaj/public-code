import React from "react";
import { Centered } from "../components/centered";
import { useT } from "../hooks/translation";
import { capitalizeFirstLetter } from "../util";
import { Link } from "../routing/components/link";

export interface Props {}

export function NotFound(props: Props) {
  const t = useT();
  return (
    <Centered>
      <h1>
        {capitalizeFirstLetter(t('page not found'))}
      </h1>
      <p><Link to={'/'}>{capitalizeFirstLetter(t('go back to the main page'))}</Link></p>
    </Centered>
  );
}
