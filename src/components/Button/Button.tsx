import type { ButtonHTMLAttributes, FC, ReactNode } from 'react';
import './Button.scss';

type ButtonProps = {
  children: ReactNode,
  onClick?: () => void,
  submit?: boolean,
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: FC<ButtonProps> = ({ children, onClick, submit, ...rest }) => {
  return (
    <button
      className="button"
      type={submit === true ? 'submit' : 'button'}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  )
}