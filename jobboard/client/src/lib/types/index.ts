export interface Company {
  id: string;
  name: string;
  description: string;
  jobs: Job[];
}

export interface Job {
  id: string;
  title: string;
  date: string;
  description: string;
  company: Company;
}

export interface User {
  id: string;
  email: string;
}
