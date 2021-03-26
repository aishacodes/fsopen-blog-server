const userRouter = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");

userRouter.get("/", async (req, res, next) => {
  try {
    const users = await User.find({}).populate("blogs");

    res.json(users);
  } catch (error) {
    next(error);
  }
});

userRouter.post("/", async (req, res, next) => {
  const body = req.body;
  let passwordHash = body.password;
  if (passwordHash.length < 3)
    return res.status(404).json({ error: "invalid password " });

  const saltRounds = 10;
  passwordHash = await bcrypt.hash(body.password, saltRounds);

  const newUser = {
    username: body.username,
    name: body.name,
    passwordHash,
  };

  try {
    const savedUser = await new User(newUser).save();

    res.status(200).json(savedUser);
  } catch (error) {
    next(error);
  }
});

module.exports = userRouter;
