import { connection } from './connection';
import DataLoader from 'dataloader';
import type { CompanyEntity } from './types';

const getCompanyTable = () => connection.table<CompanyEntity>('company');

export async function getCompany(id: string) {
  return await getCompanyTable().first().where({ id });
}

export function createCompanyLoader() {
  return new DataLoader(async (ids: string[]) => {
    console.log('[companyLoader] ids', ids);
    const companies = await getCompanyTable().select().whereIn('id', ids);
    return ids.map((id) => companies.find((company) => company.id === id));
  });
}
