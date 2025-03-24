const { ApolloServer } = require("apollo-server");
const neo4j = require("neo4j-driver");
const { Neo4jGraphQL } = require("@neo4j/graphql");

// check if work > nc -zv localhost 7687
const driver = neo4j.driver(
  "bolt://localhost:7687",
  neo4j.auth.basic("neo4j", "password")
);

const typeDefs = /* GraphQL */ `
  type Business @node{
    businessId: ID!
    averageStars: Float!
      @cypher(
        statement: "MATCH (this)<-[:REVIEWS]-(r:Review) RETURN avg(r.stars) AS averageStars",
        columnName: "averageStars"
      )
    name: String!
    city: String!
    state: String!
    address: String!
    location: Point!
    reviews: [Review!]! @relationship(type: "REVIEWS", direction: IN)
    categories: [Category!]!
      @relationship(type: "IN_CATEGORY", direction: OUT)
  }

  type User @node{
    userID: ID!
    name: String!
    reviews: [Review!]! @relationship(type: "WROTE", direction: OUT)
  }

  type Review @node{
    reviewId: ID!
    stars: Float!
    date: Date!
    text: String
    user: User! @relationship(type: "WROTE", direction: IN)
    business: Business! @relationship(type: "REVIEWS", direction: OUT)
  }

  type Category @node{
    name: String!
    businesses: [Business!]!
      @relationship(type: "IN_CATEGORY", direction: IN)
  }
`;

const neoSchema = new Neo4jGraphQL({ 
  typeDefs, 
  driver,
  features: {
    cypher: true,
  },
});

neoSchema.getSchema()
  .then((schema) => {
    const server = new ApolloServer({ schema });

    server.listen().then(({ url }) => {
      console.log(`🚀 GraphQL сервер запущен по адресу ${url}`);
    });
  })
  .catch((error) => {
    console.error("Ошибка при создании схемы:", error);
  });

// node index.js
// http://localhost:4000