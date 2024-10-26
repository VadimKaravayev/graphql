import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useCreateJob } from '../lib/graphql/hooks';

function CreateJobPage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const { createJob, loading } = useCreateJob();

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    const job = await createJob(title, description);

    navigate(`/jobs/${job.id}`);
    console.log('should post a new job:', { job });
  };

  return (
    <div>
      <h1 className="title">New Job</h1>
      <div className="box">
        <form action="">
          <div className="field">
            <label htmlFor="" className="label">
              Title
            </label>
            <div className="conrol">
              <input
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                className="input"
                value={title}
              />
            </div>
          </div>
          <div className="field">
            <label htmlFor="" className="label">
              Description
            </label>
            <div className="conrol">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="textarea"
                rows={10}
              ></textarea>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <button
                disabled={loading}
                onClick={handleSubmit}
                className="button is-link"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateJobPage;
