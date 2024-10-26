import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { queryType, makeSchema } from 'nexus';

const Query = queryType({
  definition: (t) => {
    t.string('greeting', {
      resolve: () => 'Hello world from server code first',
    });
  },
});

const schema = makeSchema({ types: [Query] });

// const typeDefs = `#graphql
//   type Query {
//     greeting: String
//   }
// `;

// const resolvers = {
//   Query: {
//     greeting: () => 'Hello, world!',
//   },
// };

const server = new ApolloServer({ schema });
const info = await startStandaloneServer(server, { listen: { port: 9000 } });
console.log({ info });
