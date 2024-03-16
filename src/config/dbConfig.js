const mongoose = require("mongoose");
const {ServerApiVersion} =require("mongodb")
require('dotenv').config();
const MONGODB_URI = process.env.MONGODB_URI;

const connectToDatabase = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });

    console.log("Mongo DB Connected");
  } catch (error) {
    console.error("Mongo DB Connection Error:", error);
  }
};

module.exports = connectToDatabase;
