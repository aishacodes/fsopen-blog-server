const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");
const User = require("./../models/user");
const loginRouter = require("express").Router();

loginRouter.post("/", async (req, res) => {
  const body = req.body;
  const user = await User.findOne({ username: body.username });
  console.log(user);
  const passwordCorrect =
    user === null
      ? false
      : await bcrypt.compare(body.password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: "invalid username or password",
    });
  }

  const userForToken = {
    username: body.username,
    id: user._id,
  };
  const token = jwt.sign(userForToken, process.env.SECRET);

  res.status(200).send({ token, username: user.username, name: user.name });
});

module.exports = loginRouter;
