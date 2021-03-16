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
  let blog = request.body;
  if (!blog.title || !blog.url) return response.status(400).end();
  blog = new Blog(blog);

  try {
    const result = await blog.save();
    response.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

blogRouter.delete("/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    await Blog.findByIdAndRemove(id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

module.exports = blogRouter;
