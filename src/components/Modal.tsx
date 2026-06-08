import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
  title: string;
}

const getFocusable = (modal: HTMLDivElement | null) => {
  if (modal === null) return [];
  return Array.from(
    modal.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
  );
};

const Modal = ({ title, children, onClose }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const focusable = getFocusable(modalRef.current);
    focusable[0]?.focus();
  }, []);

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      if (e.key === 'Tab') {
        const focusable = getFocusable(modalRef.current);
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeydown);

    return () => document.removeEventListener('keydown', handleKeydown);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div
      className="modal d-block"
      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content" ref={modalRef}>
          <div className="modal-header">
            <h2 id="modal-title">{title}</h2>
            <button
              className="btn-close"
              onClick={onClose}
              aria-label="Close modal"
            />
          </div>
          <div className="modal-body">{children}</div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
