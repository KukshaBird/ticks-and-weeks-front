import React, { useImperativeHandle, useRef } from 'react';

export interface ModalDisplayHandle {
  open: () => void;
  close: () => void;
}

export interface ModalProps {
  ref: React.Ref<ModalDisplayHandle>;
  children: React.ReactNode;
}

export function Modal({ children, ref }: ModalProps): React.ReactElement {
  const modal = useRef<HTMLDialogElement>(null);
  useImperativeHandle(ref, () => {
    return {
      open() {
        if (modal.current) {
          modal.current.showModal();
        }
      },
      close() {
        if (modal.current) {
          modal.current.close();
        }
      },
    };
  }, []);

  const onClose = () => {
    if (modal.current) {
      modal.current.close();
    }
  };

  const handleClose = () => {
    if (modal.current) {
      modal.current.close();
    }
  };

  return (
    <dialog ref={modal} onClose={onClose}>
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
          {children}
          <div className="flex justify-end space-x-4">
            <button className="btn-secondary" onClick={handleClose}>
              Cancel
            </button>
            <button className="btn-primary" onClick={handleClose}>
              Confirm
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
}
