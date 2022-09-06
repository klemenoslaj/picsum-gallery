import { createContext, FunctionComponent, PropsWithChildren, useContext, useEffect, useMemo, useRef } from 'react';
import classNames from 'classnames';

import Button, { ButtonProps } from './Button';
import { HTMLParams } from './types';

export interface ModalProps extends HTMLParams<'dialog'> {
  readonly open: boolean;
  readonly onClose?: () => void;
}

interface DialogContext {
  readonly closeModal: () => void;
  readonly openModal: () => void;
}

const DialogContext = createContext<DialogContext | null>(null);

const Modal: FunctionComponent<PropsWithChildren<ModalProps>> = ({ open, children, className, onClose, ...props }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const context = useMemo(
    () => ({
      closeModal: () => {
        document.body.style.overflow = 'unset';
        dialogRef.current?.close();
        onClose?.();
      },
      openModal: () => {
        if (dialogRef.current && !dialogRef.current.open) {
          document.body.style.overflow = 'hidden';
          dialogRef.current.showModal();
        }
      },
    }),
    [],
  );

  useEffect(() => {
    open && context.openModal();

    return () => {
      open && context.closeModal();
    };
  }, [open]);

  return (
    <dialog
      {...props}
      ref={dialogRef}
      className={classNames('flex flex-col justify-end p-0 border-white backdrop:bg-black/90', className)}
      onClose={context.closeModal}
      onClick={context.closeModal}
    >
      <div className="contents" onClick={(event) => event.stopPropagation()}>
        <DialogContext.Provider value={context}>{children}</DialogContext.Provider>
      </div>
    </dialog>
  );
};

export const CloseModalButton: FunctionComponent<Omit<ButtonProps<'button'>, 'onClick'>> = (props) => {
  const context = useContext(DialogContext);

  if (!context) {
    console.warn('CloseModalButton should only be used within the Modal component.');
    return null;
  }

  return <Button color="blue" aria-label="Close fullscreen dialog" {...props} onClick={context.closeModal} />;
};

export default Modal;
