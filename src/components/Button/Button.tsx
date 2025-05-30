import type { ButtonHTMLAttributes, FC, ReactNode } from 'react';
import './Button.scss';

type ButtonProps = {
  children: ReactNode,
  onClick?: () => void,
  sumbit?: boolean,
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: FC<ButtonProps> = ({ children, onClick, sumbit, ...rest }) => {
  return (
    <button
      className="button"
      type={sumbit === true ? 'submit' : 'button'}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  )
}