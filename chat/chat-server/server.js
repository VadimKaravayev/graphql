import express from 'express';
import cors from 'cors';
import { handleLogin, authMiddleware, decodeToken } from './auth.js';
import { readFile } from 'node:fs/promises';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware as apolloMiddleware } from '@apollo/server/express4';
import { resolvers } from './resolvers.js';
import { WebSocketServer } from 'ws';
import { createServer } from 'node:http';
import { useServer as useWsServer } from 'graphql-ws/lib/use/ws';
import { makeExecutableSchema } from '@graphql-tools/schema';

const PORT = 9000;

const app = express();

app.use(cors(), express.json());

app.get('/', (req, res) => {
  return res.send('<h3>Welcome to chat server</h3>');
});
app.post('/login', handleLogin);

function getHttpContext({ req }) {
  if (req.auth) {
    return { user: req.auth.sub };
  }
  return {};
}

function getWsContext({ connectionParams }) {
  console.log('[getWsContext] connectionParams', connectionParams);
  const accessToken = connectionParams?.accessToken;
  if (accessToken) {
    const payload = decodeToken(accessToken);
    console.log('[getWsContext] payload', payload);
    return {
      user: payload.sub,
    };
  }
  return {};
}

const typeDefs = await readFile('./schema.graphql', 'utf8');
const schema = makeExecutableSchema({ typeDefs, resolvers });

const apolloServer = new ApolloServer({ schema });
await apolloServer.start();
app.use(
  '/graphql',
  authMiddleware,
  apolloMiddleware(apolloServer, {
    context: getHttpContext,
  })
);

const httpServer = createServer(app);
const wsServer = new WebSocketServer({ server: httpServer, path: '/graphql' });
useWsServer({ schema, context: getWsContext }, wsServer);

httpServer.listen({ port: PORT }, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`GraphQL endpoint: http://localhost:${PORT}/graphql`);
});
