const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");
const blogRouter = require("./controllers/blog");
const userRoutes = require("./controllers/userRoutes");

const logger = require("./utils/logger");
const middleware = require("./utils/middleware");
const config = require("./utils/config");

mongoose
  .connect(config.mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true,
  })
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB:", error.message);
  });

app.use(cors());
app.use(express.json());

// morgan.token("body", (req, res) => JSON.stringify(req.body));

// app.use(
//   morgan(":method :url status :res[content-length] - :response-time ms :body")
// );

app.use(middleware.requestLogger);

app.use("/api/blogs", blogRouter);
app.use("/api/users", userRoutes);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
