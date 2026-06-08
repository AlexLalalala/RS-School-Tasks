import { render, screen } from '@testing-library/react';
import useFormStore from '../stores/useFormStore';
import SubmissionList from './SubmissionList';
import type { FormSubmission } from '../stores/useFormStore';

const makeSubmission = (
  overrides?: Partial<FormSubmission>
): FormSubmission => ({
  id: crypto.randomUUID(),
  submittedAt: new Date('2024-01-01T12:00:00'),
  data: {
    name: 'John',
    email: 'john@example.com',
    age: 25,
    gender: 'male',
    country: 'Georgia',
    terms: true,
    image: 'data:image/png;base64,fakebase64',
  },
  ...overrides,
});

beforeEach(() => {
  useFormStore.setState({ submissions: [] });
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

describe('SubmissionList', () => {
  it('shows empty state when there are no submissions', () => {
    render(<SubmissionList />);
    expect(screen.getByText(/no submissions yet/i)).toBeInTheDocument();
  });

  it('renders a card for each submission', () => {
    useFormStore.setState({
      submissions: [
        makeSubmission({ data: { ...makeSubmission().data, name: 'Alice' } }),
        makeSubmission({ data: { ...makeSubmission().data, name: 'Bob' } }),
      ],
    });
    render(<SubmissionList />);
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
  });

  it('highlights the last submission on render', () => {
    useFormStore.setState({ submissions: [makeSubmission()] });
    render(<SubmissionList />);
    expect(screen.getByText('John').closest('.card')).toHaveClass(
      'border-success'
    );
  });

  it('does not highlight older submissions when a new one is added', () => {
    const first = makeSubmission({
      data: { ...makeSubmission().data, name: 'Alice' },
    });
    const second = makeSubmission({
      data: { ...makeSubmission().data, name: 'Bob' },
    });
    useFormStore.setState({ submissions: [first, second] });
    render(<SubmissionList />);

    expect(screen.getByText('Alice').closest('.card')).not.toHaveClass(
      'border-success'
    );
    expect(screen.getByText('Bob').closest('.card')).toHaveClass(
      'border-success'
    );
  });
});
