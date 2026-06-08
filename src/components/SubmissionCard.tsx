import { useEffect, useState } from 'react';
import type { FormSubmission } from '../stores/useFormStore';

interface SubmissionCardProps {
  submission: FormSubmission;
  isNew: boolean;
}

interface SubmissionCardProps {
  submission: FormSubmission;
  isNew: boolean;
}

const SubmissionCard = ({ submission, isNew }: SubmissionCardProps) => {
  const [highlight, setHighlight] = useState(isNew);

  useEffect(() => {
    if (!isNew) return;
    const timer = setTimeout(() => setHighlight(false), 3000);
    return () => clearTimeout(timer);
  }, [isNew]);

  const { data, submittedAt } = submission;

  return (
    <div className={`card mb-3 ${highlight ? 'border-success border-3' : ''}`}>
      <div className="row g-0">
        <div className="col-3">
          <img
            src={data.image}
            alt="submission"
            className="img-fluid rounded-start h-100 object-fit-cover"
          />
        </div>
        <div className="col-9">
          <div className="card-body">
            <h5 className="card-title">{data.name}</h5>
            <p className="card-text mb-1">Email: {data.email}</p>
            <p className="card-text mb-1">Age: {data.age}</p>
            <p className="card-text mb-1">Gender: {data.gender}</p>
            <p className="card-text mb-1">Country: {data.country}</p>
            <p className="card-text">
              <small className="text-muted">
                Submitted: {submittedAt.toLocaleString()}
              </small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmissionCard;
