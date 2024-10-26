import { useState } from 'react';
import { useJobs } from '../lib/graphql/hooks';
import JobList from '../components/JobList';
import PaginationBar from '../components/PaginationBar';

const JOBS_PER_PAGE = 5;

function HomePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const offset = (currentPage - 1) * JOBS_PER_PAGE;
  const { jobs, isLoading, isError } = useJobs(JOBS_PER_PAGE, offset);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div className="has-text-danger">Error occured</div>;
  }

  const totalPages = Math.ceil(jobs.totalCount / JOBS_PER_PAGE);

  return (
    <div>
      <h1 className="title">Job Board</h1>
      <PaginationBar
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
      <JobList jobs={jobs.items} />
    </div>
  );
}

export default HomePage;
