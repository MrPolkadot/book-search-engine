const { connect, connection } = require("mongoose");

const mongoURL = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/googlebooks';

connect(mongoURL);

module.exports = mongoose.connection;
