const mongoose = require("mongoose");
const supertest = require("supertest");

const app = require("./../app");

const api = supertest(app);

const Blog = require("./../models/blog");
const initialBlogs = [
  {
    title: "How to code",
    author: "Ayii",
    url: "https://how-to-code",
    likes: 3,
  },
  {
    title: "How to Eat",
    author: "Ayiishh",
    url: "https://how-to-eat",
    likes: 3,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(initialBlogs[0]);
  await blogObject.save();
  blogObject = new Blog(initialBlogs[1]);
  await blogObject.save();
});

test("contacts are returned in json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("blogs are 2", async () => {
  let res = await api.get("/api/blogs");
  expect(res.body).toHaveLength(2);
});

test("returned blogs should contain id", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body[1].id).toBeDefined();
});

test("a valid blog can be added", async () => {
  const newBlog = {
    title: "React Routers",
    author: "Sam John",
    url: "https://reactrouters.com/",
    likes: 7,
  };
  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");
  const blogTitle = response.body.map((blog) => blog.title);

  expect(response.body).toHaveLength(initialBlogs.length + 1);
  expect(blogTitle).toContain(newBlog.title);
});

test("blogs with missing title and url not added ", async () => {
  const noUrlBlog = {
    author: "Edgar Frank",
    title: "arigato masarimasem",
    likes: 2,
  };

  const noTitleBlog = {
    url: "https://reactrouters.com/",
    author: "Precious james",
    likes: 7,
  };

  await api.post("/api/blogs").send(noUrlBlog).expect(400);

  await api.post("/api/blogs").send(noTitleBlog).expect(400);

  const response = await api.get("/api/blogs");
  expect(response.body).toHaveLength(initialBlogs.length);
});

afterAll(() => {
  mongoose.connection.close();
});
