import { render, screen } from '@testing-library/react';
import Modal from './Modal';
import userEvent from '@testing-library/user-event';

const mockedOnClose = vi.fn();

const renderModal = (onClose = vi.fn(), title = 'Test title') => {
  render(
    <Modal title={title} onClose={onClose}>
      <button>First</button>
      <button>Second</button>
      <button>Third</button>
    </Modal>
  );
};

beforeEach(() => {
  mockedOnClose.mockClear();
});

describe('Modal', () => {
  it('renders child', () => {
    renderModal();

    expect(screen.getByRole('button', { name: 'First' })).toBeInTheDocument();
  });

  describe('closing', () => {
    it('closes when close button clicked', async () => {
      const user = userEvent.setup();
      renderModal(mockedOnClose);

      await user.click(screen.getByRole('button', { name: /close modal/i }));

      expect(mockedOnClose).toHaveBeenCalledOnce();
    });
    it('closes when user clicks outside of the window', async () => {
      const user = userEvent.setup();
      renderModal(mockedOnClose);

      await user.click(screen.getByRole('dialog'));

      expect(mockedOnClose).toHaveBeenCalledOnce();
    });
    it('closes when user presses Escape', async () => {
      const user = userEvent.setup();
      renderModal(mockedOnClose);

      await user.keyboard('{Escape}');

      expect(mockedOnClose).toHaveBeenCalledOnce();
    });
  });
  describe('focus management', () => {
    it('focuses the first focusable element on mount', () => {
      renderModal();
      expect(screen.getByRole('button', { name: 'Close modal' })).toHaveFocus();
    });

    it('wraps focus forward from last to first on Tab', async () => {
      renderModal();
      const last = screen.getByRole('button', { name: 'Third' });
      last.focus();
      await userEvent.keyboard('{Tab}');
      expect(screen.getByRole('button', { name: 'Close modal' })).toHaveFocus();
    });

    it('wraps focus backward from first to last on Shift+Tab', async () => {
      renderModal();
      screen.getByRole('button', { name: 'Close modal' }).focus();
      await userEvent.keyboard('{Shift>}{Tab}{/Shift}');
      expect(screen.getByRole('button', { name: 'Third' })).toHaveFocus();
    });
  });
});
