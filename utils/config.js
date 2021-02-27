require("dotenv").config();

const PORT = process.env.PORT;
let mongoUrl = process.env.db_URL;

if (process.env.NODE_ENV === "test") {
  mongoUrl = process.env.TEST_DB_URL;
}
module.exports = { PORT, mongoUrl };
