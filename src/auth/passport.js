const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const jwt = require("jsonwebtoken");

const User = require("../models/User.js");

passport.use(
  "signin",
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    (email, password, done) => {
      User.findOne({ email: email })
        .then(async (user) => {
          if (!user) {
            return done(null, false, {
              message: "Usuario no encontrado o inexistente.",
            });
          }

          const auth = await user.matchPassword(password);

          if (!auth) {
            return done(null, false, { message: "Contraseña invalida" });
          }

          return done(null, user, { message: "Bienvenido de nuevo" });
        })
        .catch((err) => done(err));
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user._id);
});

passport.deserializeUser(function (_id, done) {
  User.findOne({ _id: _id }).then((user) => {
    done(null, user);
  });
});
