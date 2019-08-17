const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList
} = graphql;
const _ = require("lodash");
const Book = require("../models/book");
const Author = require("../models/author");

//DummyData
var books = [
  { name: "HP1", genre: "Fantasy", id: "1", authorId: "1" },
  { name: "HP2", genre: "Fantasy", id: "2", authorId: "2" },
  { name: "HP4", genre: "Fiction", id: "4", authorId: "4" },
  { name: "HP5", genre: "Fiction", id: "5", authorId: "1" },
  { name: "HP6", genre: "Fantasy", id: "6", authorId: "2" },
  { name: "HP7", genre: "Fiction", id: "7", authorId: "3" },
  { name: "HP8", genre: "Fiction", id: "8", authorId: "4" },
  { name: "HP3", genre: "Fantasy", id: "3", authorId: "3" }
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
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve: (parent, args) => _.find(authors, { id: parent.authorId })
    }
  })
});
const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    book: {
      type: new GraphQLList(BookType),
      resolve: (parent, args) => _.filter(books, { authorId: parent.id })
    }
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
    },
    books: {
      type: new GraphQLList(BookType),
      resolve: (parent, args) => books
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve: () => authors
    }
  }
});
// ROot queries are how we describe how we jump to the graph initially

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addAuthor: {
      type: AuthorType,
      args: { name: { type: GraphQLString }, age: { type: GraphQLInt } },
      resolve: (parent, args) => {
        let author = new Author({ name: args.name, age: args.age });
        return author.save();
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
