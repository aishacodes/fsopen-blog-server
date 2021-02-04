require("dotenv").config();

const PORT = process.env.PORT;
const mongoUrl = process.env.db_URL;

module.exports = { PORT, mongoUrl };
