import type { ButtonHTMLAttributes, FC, ReactNode } from 'react';
import './Button.scss';

type ButtonProps = {
  children: ReactNode,
  onClick?: () => void,
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: FC<ButtonProps> = ({ children, onClick, ...rest }) => {
  return (
    <button
      className="button"
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  )
}