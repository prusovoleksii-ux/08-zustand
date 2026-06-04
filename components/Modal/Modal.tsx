'use client'

import { createPortal } from 'react-dom';
import css from './Modal.module.css'
import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface ModalProps {
  children: React.ReactNode;
}

export default function Modal({children}: ModalProps) {

  const router = useRouter();
  const close = useCallback(() => {
    router.back();
  }, [router]);

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      close();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [close]);

  return createPortal(
    <div
    className={css.backdrop}
    role="dialog"
    aria-modal="true"
    onClick={handleBackdropClick}
    >
        <div className={css.modal}>
           {children} 
           <button onClick={close}>Close</button>
        </div>
    </div>,
    document.body
  );
}