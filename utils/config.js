const { request } = require("express");

require("dotenv").config();

const PORT = process.env.PORT;
let mongoUrl = process.env.db_URL;

if (process.env.NODE_ENV === "test") {
  mongoUrl = process.env.TEST_DB_URL;
}

const getToken = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer")) {
    return authorization.substring(7);
  }
  return null;
};

module.exports = { PORT, mongoUrl, getToken };
