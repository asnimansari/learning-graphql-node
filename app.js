const express = require("express");
const graphQLHttp = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://asnim:banana%23019@learrn-graphql-nsb3j.mongodb.net/test?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);

mongoose.connection.once("open", () => console.log("Connected"));
const app = express();

app.use("/graphql", graphQLHttp({ schema, graphiql: true }));

app.listen(4000, () => {
  console.log("Listening for request on 4000");
});
