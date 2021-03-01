const blogRouter = require("express").Router();
const Blog = require("./../models/blog");

blogRouter.get("/", async (request, response, next) => {
  try {
    const notes = await Blog.find({});
    response.json(notes);
  } catch (error) {
    next(error);
  }
});

blogRouter.post("/", async (request, response) => {
  const blog = new Blog(request.body);
  try {
    const result = await blog.save();
    response.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = blogRouter;
