const userRouter = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("./../models/user");

userRouter.get("/", async (req, res, next) => {
  try {
    const users = await User.find({});

    res.json(users);
  } catch (error) {
    next(error);
  }
});

userRouter.post("/", async (req, res, next) => {
  const body = req.body;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const newUser = {
    username: body.username,
    name: body.name,
    password: passwordHash,
  };

  try {
    const savedUser = await new User(newUser).save();

    res.status(201).json(savedUser);
  } catch (error) {
    next(error);
  }
});

module.exports = userRouter;
