import express, { Request, Response } from 'express';
import cors from 'cors';
import { authMiddleware, handleLogin } from './auth';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware as apolloMiddleware } from '@apollo/server/express4';
import { readFile } from 'node:fs/promises';
import { ResolverContext, resolvers } from './resolvers';
import { getUser } from './db/users';
import { createCompanyLoader } from './db/companies';

const PORT = 9000;

const app = express();

app.use(cors(), express.json());
app.use(authMiddleware);

app.get('/', (req: Request, res: Response) => {
  res.send('Jobboard server');
});
app.post('/login', handleLogin);

const typeDefs = await readFile('./schema.graphql', 'utf-8');
const apolloServer = new ApolloServer({ typeDefs, resolvers });
await apolloServer.start();

async function getContext({ req }): Promise<ResolverContext> {
  console.log(req.auth);
  const companyLoader = createCompanyLoader();
  const context = { companyLoader } as ResolverContext;
  if (req.auth) {
    context.user = await getUser(req.auth.sub);
  }
  return context;
}

app.use(
  '/graphql',
  apolloMiddleware(apolloServer, {
    context: getContext,
  })
);

app.listen({ port: PORT }, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`GraphQL running on http://localhost:${PORT}/graphql`);
});
