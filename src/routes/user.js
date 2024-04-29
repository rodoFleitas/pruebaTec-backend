const server = require("express").Router();

const passport = require("passport");
require("../auth/passport.js");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

server.post("/signup", async (req, res, next) => {
  const body = req.body;

  try {
    const user = new User(body);
    user.password = await user.encryptPassword(user.password);
    user.token = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.ACCESS_TOKEN_SECRET
    );

    await user.save();

    const userData = {
      token: user.token,
      userId: user._id,
      userData: {
        name: user.name,
        lastname: user.lastname,
        email: user.email,
      },
    };

    res.status(200).json({
      message: "Usuario creado",
      user: userData,
    });
  } catch (error) {
    res.status(400).json({ message: "Error al crear usuario" });
  }
});

server.post("/signin", async (req, res, next) => {
  passport.authenticate("signin", async (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(400).json(info);

    const userData = {
      token: user.token,

      userId: user._id,
      userData: {
        name: user.name,
        lastname: user.lastname,
        email: user.email,
      },
    };

    res.status(200).json({ userData });
  })(req, res, next);
});

module.exports = server;
