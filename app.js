const express = require("express");
const graphQLHttp = require("express-graphql");
const schema = require("./schema/schema");

const app = express();

app.use("/graphql", graphQLHttp({ schema, graphiql: true }));

app.listen(4000, () => {
  console.log("Listening for request on 4000");
});
