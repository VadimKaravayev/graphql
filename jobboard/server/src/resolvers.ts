import {
  getJobs,
  getJob,
  getJobsByCompanyId,
  createJob,
  deleteJob,
  updateJob,
  countJobs,
} from './db/jobs';
import { getCompany } from './db/companies';
import { GraphQLError } from 'graphql';
import { Resolvers } from './generated/schema';
import DataLoader from 'dataloader';
import { CompanyEntity, UserEntity } from './db/types';

export interface ResolverContext {
  companyLoader: DataLoader<string, CompanyEntity, string>;
  user?: UserEntity;
}

export const resolvers: Resolvers = {
  Query: {
    jobs: async (_root, { limit, offset }) => {
      const items = await getJobs(limit, offset);
      const totalCount = await countJobs();
      return {
        items,
        totalCount,
      };
    },
    job: async (_root, { id }) => {
      const job = await getJob(id);
      if (!job) {
        throw notFoundError(`No job found with id: ${id}`);
      }
      return job;
    },
    company: async (_root, { id }) => {
      const company = await getCompany(id);
      if (!company) {
        throw notFoundError(`No company found with id: ${id}`);
      }
      return company;
    },
  },

  Mutation: {
    createJob: (_root, { input: { title, description } }, { user }) => {
      if (!user) {
        throw unauthorizedError('missing authorization');
      }
      const companyId = user.companyId;
      return createJob({ companyId, title, description });
    },
    deleteJob: (_root, { id }, { user }) => {
      if (!user) {
        throw unauthorizedError('missing authorization');
      }
      return deleteJob(id, user.companyId);
    },
    updateJob: (_root, { input: input }, { user }) => {
      if (!user) {
        throw unauthorizedError('missing authorization');
      }
      return updateJob(input, user.companyId);
    },
  },

  Job: {
    date: (job) => new Date(job.createdAt).toLocaleDateString('en-CA'),
    company: (job, _args, { companyLoader }) =>
      companyLoader.load(job.companyId),
  },
  Company: {
    jobs: (company) => getJobsByCompanyId(company.id),
  },
};

function notFoundError(message) {
  return new GraphQLError(message, {
    extensions: {
      code: 'NOT_FOUND',
    },
  });
}

function unauthorizedError(message) {
  return new GraphQLError(message, {
    extensions: {
      code: 'UNAUTHORIZED',
    },
  });
}
