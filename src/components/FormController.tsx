import { useRef, useState } from 'react';
import Modal from './Modal';
import UncontrolledForm from './UncontrolledForm';
import HookForm from './HookForm';

type ActiveForm = 'hookform' | 'uncontrolled' | null;

const FormController = () => {
  const [activeForm, setActiveForm] = useState<ActiveForm>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const handleFormOpen = (activeForm: ActiveForm, e: React.MouseEvent) => {
    triggerRef.current = e.currentTarget as HTMLElement;
    setActiveForm(activeForm);
  };

  const handleFormClose = () => {
    setActiveForm(null);
    triggerRef.current?.focus();
  };

  return (
    <div className="d-flex justify-content-center align-items-center align-self-center gap-2 my-3">
      <button
        className="btn btn-outline-secondary"
        onClick={(e: React.MouseEvent) => handleFormOpen('uncontrolled', e)}
      >
        Uncontrolled Form
      </button>
      <button
        className="btn btn-outline-secondary"
        onClick={(e: React.MouseEvent) => handleFormOpen('hookform', e)}
      >
        Hook Form
      </button>
      {activeForm !== null && (
        <Modal onClose={handleFormClose} title="Form">
          {activeForm === 'hookform' && <HookForm onClose={handleFormClose} />}
          {activeForm === 'uncontrolled' && (
            <UncontrolledForm onClose={handleFormClose} />
          )}
        </Modal>
      )}
    </div>
  );
};

export default FormController;
