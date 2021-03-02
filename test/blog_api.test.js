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

test("blogs are returned as JSON", async () => {
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

afterAll(() => {
  mongoose.connection.close();
});
