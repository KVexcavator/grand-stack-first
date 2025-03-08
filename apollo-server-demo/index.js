const { ApolloServer, gql } = require('apollo-server');
const db = require('./db');
const resolvers = require('./resolvers');
const fs = require('fs');
const path = require('path');

const typeDefs = fs.readFileSync(path.join(__dirname, 'schema.graphql'), 'utf8');

const server = new ApolloServer({ 
  typeDefs, 
  resolvers: resolvers,
  context: { db }
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});


