import { useParams } from 'react-router';
import JobList from '../components/JobList';
import { useCompany } from '../lib/graphql/hooks';

function CompanyPage() {
  const { companyId } = useParams();
  const { company, isLoading, isError } = useCompany(companyId || '');

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div className="has-text-danger">Error occured</div>;
  }

  return (
    <div>
      <h1 className="title">{company.name}</h1>
      <div className="box">{company.description}</div>
      <h2 className="title is-5">Jobs at {company.name}</h2>
      <JobList jobs={company.jobs} />
    </div>
  );
}

export default CompanyPage;
