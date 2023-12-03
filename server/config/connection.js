const { connect, connection } = require("mongoose");
require("dotenv").config();


const mongoURL = process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/googlebooks';

connect(mongoURL);

module.exports = connection;
