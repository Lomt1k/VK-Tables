import './Modal.scss';
import { createPortal } from 'react-dom';
import type { FC, MouseEventHandler, ReactNode } from "react";

type ModalProps = {
  children: ReactNode,
  onClickClose?: () => void,
}

export const Modal: FC<ModalProps> = ({ children, onClickClose }) => {
  const hadleBackgroundClick: MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.target !== e.currentTarget) return;
    if (onClickClose) onClickClose();
  }
  
  return createPortal((
    <div className="modal" onClick={hadleBackgroundClick}>
      <div className="modal__content">
        {children}
        <button
          className="modal__close"
          type='button'
          onClick={onClickClose}
          data-testid="modal-close"
        />
      </div>
    </div>
  ), document.getElementById('root')!)
}