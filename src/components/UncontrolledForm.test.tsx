import { render } from '@testing-library/react';
import { sharedFormTests } from '../__tests__/sharedFormTests';
import UncontrolledForm from './UncontrolledForm';

const renderForm = (onClose: () => void = vi.fn()) =>
  render(<UncontrolledForm onClose={onClose} />);

sharedFormTests(renderForm);
