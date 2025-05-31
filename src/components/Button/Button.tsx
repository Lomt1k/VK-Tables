import type { ButtonHTMLAttributes, FC, ReactNode } from 'react';
import './Button.scss';

type ButtonProps = {
  children: ReactNode,
  onClick?: () => void,
  submit?: boolean,
  small?: boolean,
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: FC<ButtonProps> = ({ children, onClick, submit, small, ...rest }) => {
  return (
    <button
      className={"button" + (small ? ' button--small' : '')}
      type={submit === true ? 'submit' : 'button'}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  )
}