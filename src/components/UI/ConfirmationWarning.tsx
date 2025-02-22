import React from 'react';
import Button from './Button.tsx';

interface ConfirmationWarningProps {
  children?: React.ReactNode;
  onSubmit: () => void;
  onClose: () => void;
  title?: string;
}

export default function ConfirmationWarning({
  title,
  onClose,
  onSubmit,
  children,
}: ConfirmationWarningProps): React.ReactElement {
  const handleConfirmation = () => {
    onSubmit();
    onClose();
  };
  return (
    <div>
      <h2 className={'w-full h-full font-bold size-2 text-amber-600 text-center pb-1'}>{title ?? 'Warning'}</h2>
      {children}
      <div className={'flex gap-4 justify-end m-2'}>
        <Button className={'btn-primary'} onClick={onClose}>
          Cancel
        </Button>
        <Button className={'btn-secondary'} onClick={handleConfirmation}>
          Confirm
        </Button>
      </div>
    </div>
  );
}
