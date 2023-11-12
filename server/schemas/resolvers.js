const { sign } = require("jsonwebtoken");
const { User, Book } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
    Query: {
        users: async () => {
            return User.find();
        },
        user: async () => {
            return User.findOne({ _id: _id });
        },
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id });
            }
            throw AuthenticationError;
        },
    },
    Mutation: {
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw AuthenticationError;
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw AuthenticationError;
            }

            const token = signToken(user);

            return { token, user };
        },
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
        },
        saveBook: async (parent, { bookData }, context) => {
            if (context.user) {
                const book = await Book.create({ bookData });
                
                await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedBooks: book._id } }
                );
                return book;
            }
            throw AuthenticationError;
            ("You need log in first!");
        },
        removeBook: async (parent, { bookId }, context) => {
            if (context.user) {
                const book = await Book.findOneAndDelete({
                    _id: bookId,
                });
                
                await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: book._id } }
                );
                return book;
            }
            throw AuthenticationError;
        },
    },
};

















module.exports = resolvers;