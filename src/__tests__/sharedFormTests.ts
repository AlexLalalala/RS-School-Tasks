import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import useFormStore from '../stores/useFormStore';
import fileToBase64 from '../utils/fileToBase64';

export const testFile = new File(['x'], 'test.png', { type: 'image/png' });

vi.mock('../utils/fileToBase64', () => ({
  default: vi.fn().mockResolvedValue('data:image/png;base64,fakebase64'),
}));

beforeEach(() => {
  useFormStore.setState({ submissions: [] });
  vi.mocked(fileToBase64).mockResolvedValue('data:image/png;base64,fakebase64');
});

export const fillValidForm = async (
  user: ReturnType<typeof userEvent.setup>
) => {
  await user.type(screen.getByLabelText('Email'), 'test@example.com');
  await user.type(screen.getByLabelText('Password'), 'Abcdef1!');
  await user.type(screen.getByLabelText('Confirm Password'), 'Abcdef1!');
  await user.type(screen.getByLabelText('Name'), 'John');
  await user.type(screen.getByLabelText('Age'), '25');
  await user.selectOptions(screen.getByLabelText('Gender select'), 'male');
  await user.type(screen.getByLabelText('Country input'), 'Georgia');
  await user.upload(screen.getByLabelText('Image'), testFile);
  await user.click(screen.getByLabelText(/terms and services/i));
};

export const sharedFormTests = (renderForm: (onClose?: () => void) => void) => {
  it('renders all form fields', () => {
    renderForm();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Age')).toBeInTheDocument();
    expect(screen.getByLabelText('Gender select')).toBeInTheDocument();
    expect(screen.getByLabelText('Country input')).toBeInTheDocument();
    expect(screen.getByLabelText('Image')).toBeInTheDocument();
    expect(screen.getByLabelText(/terms and services/i)).toBeInTheDocument();
  });

  it('on valid submission saves submission to store and calls onClose', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    renderForm(onClose);

    await fillValidForm(user);
    await user.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => expect(onClose).toHaveBeenCalledOnce());

    const { submissions } = useFormStore.getState();
    expect(submissions).toHaveLength(1);
    expect(submissions[0].data.email).toBe('test@example.com');
    expect(submissions[0].data.image).toBe('data:image/png;base64,fakebase64');
  });

  it('password strength indicator updates as the user types', async () => {
    const user = userEvent.setup();
    renderForm();
    await user.type(screen.getByLabelText('Password'), 'Abcdef1!');
    expect(screen.getByText('Strong')).toBeInTheDocument();
  });
};
