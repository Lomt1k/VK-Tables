import './Modal.scss';
import { createPortal } from 'react-dom';
import type { FC, ReactNode } from "react";

type ModalProps = {
  children: ReactNode,
  onClickClose?: () => void,
}

export const Modal: FC<ModalProps> = ({ children, onClickClose }) => {
  return createPortal((
    <div className="modal" onClick={onClickClose}>
      <div className="modal__content">
        {children}
        <button
          className="modal__close"
          type='button'
          onClick={onClickClose}
        />
      </div>
    </div>
  ), document.getElementById('root')!)
}