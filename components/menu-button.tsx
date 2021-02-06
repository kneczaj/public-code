import React, { AriaAttributes, MouseEventHandler } from 'react';
import Menu from '@material-ui/core/Menu';
import { IconButton, PropTypes } from '@material-ui/core';

export interface ButtonProps {
  'aria-controls': AriaAttributes['aria-controls'];
  'aria-haspopup': AriaAttributes['aria-haspopup'];
  color?: PropTypes.Color;
  onClick: MouseEventHandler;
}

export interface Props {
  id: string;
  children: React.ReactNode;
  label?: React.ReactNode;
  color?: PropTypes.Color;
  button?: (props: ButtonProps) => React.ReactNode;
}

export function MenuButton({ children, color, id, label, button }: Props) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {button ? (
        button({
          'aria-controls': id,
          'aria-haspopup': 'true',
          color: color,
          onClick: handleClick
        })
      ) : (
        <IconButton
          aria-controls={id}
          aria-haspopup='true'
          color={color}
          onClick={handleClick}
        >
          {label}
        </IconButton>
      )}
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
