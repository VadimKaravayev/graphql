import {
  createHttpLink,
  ApolloLink,
  concat,
  ApolloClient,
  InMemoryCache,
  split,
  Operation,
} from '@apollo/client';
import { getAccessToken } from '../auth';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient as createWsClient } from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { Kind, OperationTypeNode } from 'graphql';

const httpLink = createHttpLink({
  uri: 'http://localhost:9000/graphql',
});

const authLink = new ApolloLink((operation, forward) => {
  const accessToken = getAccessToken();
  if (accessToken) {
    operation.setContext({
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  }
  return forward(operation);
});

const authHttpLink = concat(authLink, httpLink);

const wsLink = new GraphQLWsLink(
  createWsClient({
    url: 'ws://localhost:9000/graphql',
    connectionParams: () => ({ accessToken: getAccessToken() }),
  })
);

export const apolloClient = new ApolloClient({
  link: split(isSubscription, wsLink, authHttpLink),
  cache: new InMemoryCache(),
});

function isSubscription(operation: Operation) {
  console.log(operation);
  const definition = getMainDefinition(operation.query);
  return (
    definition.kind === Kind.OPERATION_DEFINITION &&
    definition.operation === OperationTypeNode.SUBSCRIPTION
  );
}
