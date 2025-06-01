import type { ButtonHTMLAttributes, FC, ReactNode } from 'react';
import './Button.scss';

type ButtonProps = {
  children: ReactNode,
  onClick?: () => void,
  className?: string,
  submit?: boolean,
  small?: boolean,
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: FC<ButtonProps> = ({ children, onClick, className, submit, small, ...rest }) => {
  const classes = "button"
    + (small ? ' button--small' : '')
    + (className ? ` ${className}` : '');

  return (
    <button
      className={classes}
      type={submit === true ? 'submit' : 'button'}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  )
}