const blogRouter = require("express").Router();
const Blog = require("./../models/blog");
const User = require("./../models/user");

blogRouter.get("/", async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate("user", {
      username: 1,
      name: 1,
    });
    response.json(blogs);
  } catch (error) {
    next(error);
  }
});

blogRouter.post("/", async (request, response, next) => {
  let body = request.body;

  const user = await User.findById(body.userid);

  if (!body.title || !body.url) return response.status(400).end();

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  });

  try {
    const result = await blog.save();
    console.log(result);
    user.blogs = user.blogs.concat(result._id);
    await user.save();

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

blogRouter.put("/:id", async (req, res, next) => {
  const id = req.params.id;
  const body = req.body;
  const update = {
    likes: body.likes,
  };
  try {
    await Blog.findByIdAndUpdate(id, update, { new: true });
    res.status(200).json(update);
  } catch (error) {
    next(error);
  }
});

module.exports = blogRouter;
