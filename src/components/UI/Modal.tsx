import React, { RefObject, useImperativeHandle, useRef } from 'react';
import { createPortal } from 'react-dom';

export interface ModalDisplayHandle {
  open: () => void;
  close: () => void;
}

export interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
  ref: RefObject<ModalDisplayHandle | null>;
}

export function Modal({ children, onClose, ref }: ModalProps): React.ReactPortal | null {
  const dialogRef = useRef<HTMLDialogElement>(null);
  useImperativeHandle(ref, () => {
    return {
      open() {
        if (dialogRef.current) {
          dialogRef.current.showModal();
        }
      },
      close() {
        if (dialogRef.current) {
          dialogRef.current.close();
        }
      },
    };
  }, []);

  const modalContainer = document.getElementById('modal-container');
  if (!modalContainer) {
    console.error('Modal container not found!');
    return null;
  } else {
    return createPortal(
      <dialog ref={dialogRef} onClose={onClose}>
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 max-h-[80%] overflow-y-auto scrollbar-hide">
            {children}
          </div>
        </div>
      </dialog>,
      modalContainer
    );
  }
}
