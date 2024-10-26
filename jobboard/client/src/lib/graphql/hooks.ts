import { useQuery, useMutation } from '@apollo/client';
import {
  companyByIdQuery,
  jobsQuery,
  jobByIdQuery,
  createJobMutation,
} from './queries';

export function useCompany(id: string) {
  const { data, loading, error } = useQuery(companyByIdQuery, {
    variables: { id },
  });

  return {
    company: data?.company,
    isLoading: loading,
    isError: Boolean(error),
  };
}

export function useJobs(limit: number, offset: number) {
  const { data, loading, error } = useQuery(jobsQuery, {
    fetchPolicy: 'network-only',
    variables: { limit, offset },
  });

  return {
    jobs: data?.jobs,
    isLoading: loading,
    isError: Boolean(error),
  };
}

export function useJob(id: string) {
  const { data, loading, error } = useQuery(jobByIdQuery, {
    variables: { id },
  });

  return {
    job: data?.job,
    isLoading: loading,
    isError: Boolean(error),
  };
}

export function useCreateJob() {
  const [mutate, { loading }] = useMutation(createJobMutation);

  const createJob = async (title: string, description: string) => {
    const {
      data: { job },
    } = await mutate({
      variables: {
        input: {
          title,
          description,
        },
      },
      update: (cache, { data }) => {
        cache.writeQuery({
          query: jobByIdQuery,
          variables: { id: data.job.id },
          data,
        });
      },
    });
    return job;
  };

  return { createJob, loading };
}
