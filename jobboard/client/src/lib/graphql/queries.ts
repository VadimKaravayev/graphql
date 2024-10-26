import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloLink,
  concat,
} from '@apollo/client';
import { getAccessToken } from '../auth';
import { graphql } from '../../generated';

const httpLink = createHttpLink({ uri: 'http://localhost:9000/graphql' });
const authLink = new ApolloLink((operation, forward) => {
  const token = getAccessToken();
  if (token) {
    console.log({ token });
    operation.setContext({
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  console.log('[authLink] operation: ', operation);
  return forward(operation);
});

export const apolloClient = new ApolloClient({
  link: concat(authLink, httpLink),
  cache: new InMemoryCache(),
});

const jobDetailFragment = graphql(`
  fragment JobDetail on Job {
    id
    title
    description
    date
    company {
      id
      name
    }
  }
`);

export const createJobMutation = graphql(`
  mutation CreateJob($input: CreateJobInput!) {
    job: createJob(input: $input) {
      ...JobDetail
    }
  }
  # ${jobDetailFragment}
`);

// export async function createJob({
//   title,
//   description,
// }: {
//   title: string;
//   description: string;
// }) {
//   const { data } = await apolloClient.mutate({
//     mutation: createJobMutation,
//     variables: {
//       input: {
//         title,
//         description,
//       },
//     },
//     update: (cache, { data }) => {
//       cache.writeQuery({
//         query: jobByIdQuery,
//         variables: { id: data.job.id },
//         data,
//       });
//     },
//   });
//   return data.job;
// }

export const companyByIdQuery = graphql(`
  query CompanyById($id: ID!) {
    company(id: $id) {
      id
      name
      description
      jobs {
        id
        title
        date
      }
    }
  }
`);

// export async function getCompany(id: string) {
//   const { data } = await apolloClient.query({
//     query: companyByIdQuery,
//     variables: { id },
//   });
//   return data.company;
// }

export const jobByIdQuery = graphql(`
  query JobById($id: ID!) {
    job(id: $id) {
      ...JobDetail
    }
  }
  # ${jobDetailFragment}
`);

// export async function getJob(id: string) {
//   const { data } = await apolloClient.query({
//     query: jobByIdQuery,
//     variables: { id },
//   });
//   return data.job;
// }

export const jobsQuery = graphql(`
  query Jobs($limit: Int, $offset: Int) {
    jobs(limit: $limit, offset: $offset) {
      items {
        id
        date
        title
        description
        company {
          name
        }
      }
      totalCount
    }
  }
`);

// export async function getJobs() {
//   const result = await apolloClient.query({
//     fetchPolicy: 'network-only',
//     query: jobsQuery,
//   });

//   return result.data.jobs;
// }
