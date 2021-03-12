import React, { AriaAttributes, MouseEventHandler } from 'react';
import Menu from '@material-ui/core/Menu';
import { PropTypes } from '@material-ui/core';

export interface ButtonProps {
  'aria-controls': AriaAttributes['aria-controls'];
  'aria-haspopup': AriaAttributes['aria-haspopup'];
  color?: PropTypes.Color;
  onClick: MouseEventHandler;
}

export interface Props {
  id: string;
  children: React.ReactNode;
  button: (props: ButtonProps) => JSX.Element;
}

export function MenuButton({ children, id, button }: Props) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {button({
        'aria-controls': id,
        'aria-haspopup': 'true',
        onClick: handleClick
      })}
      <Menu
        id={id}
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        onClick={handleClose}
      >
        {children}
      </Menu>
    </>
  );
}
