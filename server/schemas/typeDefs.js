const gql = require("graphql-tag");

const typeDefs = gql`
    input bookInput {
        author: String!
        description: String
        title: String!
        bookId: ID!
        image: String
        link: String!
    }




    type Query {
        me: [User]
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(bookData: bookInput): User
        removeBook(bookId: ID!): User
    }

    type User {
        _id: ID!
        username: String!
        email: String!
        bookCount: Int
        savedBooks: [Book]
    }

    type Book {
        bookId: ID!
        authors: [String!]
        description: String
        title: String!
        image: String
        link: String
    }

    type Auth {
        token: ID!
        user: User
    }





`














module.exports = typeDefs;