hello Apollo Server:  
 
mkdir apollo-server-demo && cd apollo-server-demo
npm init -y
npm install apollo-server graphql

файл index.js с логикой сервера :  
```javascript
const { ApolloServer, gql } = require('apollo-server');

// Определяем схему GraphQL
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

// Определяем резолверы
const resolvers = {
  Query: {
    hello: () => 'Привет, мир!',
  },
};

// Создаём экземпляр Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });

// Запускаем сервер
server.listen().then(({ url }) => {
  console.log(`🚀  Сервер запущен по адресу ${url}`);
});
```
запустить 
node index.js

GraphQL Playground
http://localhost:4000/
query {
  hello
}

==========================================================
query ExampleQuery{
  allBusinesses {
    name
    address
  }
}
query ExampleQuery{
  businessBySearchTerm(search: "Library", orderBy: name_desc){
    name
    businessId
    avgStars
  }
}
query ExampleQuery{
  businessBySearchTerm(search: "Library"){
    businessId
    name
    avgStars
    reviews {
      text
      stars
      }
    }
  }

