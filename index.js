const { ApolloServer, PubSub } = require("apollo-server");
const mongoose = require("mongoose");

const resolvers = require("./graphql/resolvers");
const { MONGODB } = require("./config");
const typeDefs = require("./graphql/typeDefs");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
});

// connect to mongodb
mongoose
  .connect(MONGODB, { useNewUrlParser: true })
  .then(() => {
    console.log("MongoDB Connected");
    return server.listen({ port: 5000 });
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
  })
  .catch((err) => console.log(err));
