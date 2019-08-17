const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt
} = graphql;
const _ = require("lodash");
//DummyData
var books = [
  { name: "HP1", genre: "Fantasy", id: "1" },
  { name: "HP2", genre: "Fantasy", id: "2" },
  { name: "HP4", genre: "Fiction", id: "4" },
  { name: "HP5", genre: "Fiction", id: "5" },
  { name: "HP3", genre: "Fantasy", id: "3" }
];
var authors = [
  { name: "Asnim", age: 44, id: "1" },
  { name: "Fahime", age: 43, id: "2" },
  { name: "Ansari", age: 45, id: "3" },
  { name: "Shameela", age: 45, id: "4" }
];
const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString }
  })
});
const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },

      resolve: (parent, args) => _.find(books, { id: args.id })
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve: (parent, args) => _.find(authors, { id: args.id })
    }
  }
});
// ROot queries are how we describe how we jump to the graph initially

module.exports = new GraphQLSchema({
  query: RootQuery
});
