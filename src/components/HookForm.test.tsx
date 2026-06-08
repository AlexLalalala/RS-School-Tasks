import { render } from '@testing-library/react';
import { sharedFormTests } from '../__tests__/sharedFormTests';
import HookForm from './HookForm';

const renderForm = (onClose: () => void = vi.fn()) =>
  render(<HookForm onClose={onClose} />);

sharedFormTests(renderForm);
