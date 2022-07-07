import { useEffect } from 'react';
import { createPortal } from "react-dom";

import s from "./modal.module.css";

const modal = document.getElementById('root-modal');

const Modal = (props) => {
    const { children, closeModal } = props;

    useEffect(() => {
        document.addEventListener('keydown', handleClose);
        return () => document.removeEventListener("keydown", handleClose);
    })
    
    const handleClose = e => {
        if(e.target === e.currentTarget) {
            closeModal();
            return;
        }
        if (e.code === "Escape") {
            closeModal();
        }
    }

     return createPortal(
      <div className={s.overlay} onClick={handleClose}>
        <div className={s.modal}>{children}</div>
      </div>,
      modal
    );
}

export default Modal;