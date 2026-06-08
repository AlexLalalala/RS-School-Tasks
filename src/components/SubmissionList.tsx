import useFormStore from '../stores/useFormStore';
import SubmissionCard from './SubmissionCard';

const SubmissionList = () => {
  const submissions = useFormStore((state) => state.submissions);

  if (submissions.length === 0) {
    return (
      <p className="text-center text-muted mt-4">
        No submissions yet. Fill out a form to get started.
      </p>
    );
  }

  return (
    <div className="container mt-4">
      <h3 className="mb-3">Submissions</h3>
      {submissions.map((submission, index) => (
        <SubmissionCard
          key={submission.id}
          submission={submission}
          isNew={index === submissions.length - 1}
        />
      ))}
    </div>
  );
};

export default SubmissionList;
