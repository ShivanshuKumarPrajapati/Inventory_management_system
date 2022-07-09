require('dotenv').config();
const User = require('./../models/user');
const { validationResult } = require('express-validator');
const jwt = require("jsonwebtoken");
const { expressjwt: expressJwt } = require("express-jwt");

exports.signupUser = (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array()[0].msg });
    }

  const user = new User(req.body);
    user.save((err, user) => {
      if (err) {
            return res.status(400).json({
              mssg: "Unable to signUp user",
              error:err
            });
        }

        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);

        res.cookie("token", token, { expire: new Date() + 9999 });

        const { _id, name, email } = user;
        return res.json({ token, user: { _id, name, email } });
      
    });

}


exports.signinUser = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array()[0].msg });
  }

  const { email, password } = req.body;

  User.findOne({email}, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User email not FOUND",
      });
    }

    if (!user.Authenticate(password)) {
      return res.status(403).json({
        error: "Email and password do not match",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);

    res.cookie("token", token, { expire: new Date() + 9999 });

    const { _id, name, email } = user;
    return res.json({ token, user: { _id, name, email } });
  });
}


exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "User Signout successfully",
  });
};


exports.isSignedIn = expressJwt({
  secret: process.env.SECRET_KEY,
  algorithms: ["HS256"],
  userProperty: "auth",
});

exports.isAuthenticated = (req, res, next) => {

    const checker = req.profile && req.auth && req.profile._id == req.auth.id;
    if (!checker) {
      return res.status(403).json({
        error: "Access denied",
      });
    }
    next();
}