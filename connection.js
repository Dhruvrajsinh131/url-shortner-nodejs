require("dotenv").config();
const { connect } = require("mongoose");

const createMongoConnection = async () => {
  return connect(process.env.MONGO_URI)
    .then(() => {
      console.log("connected with mongo");
    })
    .catch(() => {
      console.log("failed To connect with Db");
    });
};

module.exports = createMongoConnection;
