const blogRouter = require("express").Router();
const Blog = require("./../models/blog");
const User = require("./../models/user");
const { getToken } = require("./../utils/config");
const jwt = require("jsonwebtoken");
const { request } = require("../app");
const { findById } = require("./../models/blog");

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
  if (!request.token)
    return response.status(401).json({ error: "token missing" });

  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!request.token || !decodedToken.id)
    return response.status(404).json({ error: "invalid token " });

  const user = await User.findById(decodedToken.id);

  if (!body.title || !body.url) return response.status(400).end();
  if (!body.likes) body.likes = 0;
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  });

  try {
    const result = await blog.save();
    // console.log(result);
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
    if (!req.token) return res.status(401).json({ error: "token missing" });
    const decodedToken = jwt.verify(req.token, process.env.SECRET);

    if (!req.token || !decodedToken.id)
      return res.status(401).send("errorr: token missing or invalid");

    const blogToDelete = await Blog.findById(id);
    if (decodedToken.id.toString() !== blogToDelete.user.toString())
      return res.status(404).send({ error: "permission denied" });

    await blogToDelete.remove();
    res.status(200).end();
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
