const User = require('./../models/user');
const { validationResult } = require('express-validator');
const jwt = require("jsonwebtoken");
const expressJwt = require('express-validator');

exports.signupUser = (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array()[0].msg });
    }

    const user = new User(req.body);
    user.save((err, user) => {
        if (err) {
            return res.status(400).json({
                error: "Unable to signUp user"
            });
        }

        return res.json({
            email: user.email,
            id: user._id
        });
    });

}


exports.signinUser = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array()[0].msg });
    }

    User.findOne(req.body.email, (err, user) => {
        if (err) {
            return res.status(400).json({
                error: "User email not FOUND"
            });

        }

        if (!user.Authenticate(req.body.password)) {
            return res.status(403).json({
                error: "Email and password do not match",
            });
        }
        
        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
            algorithm: "RS256",
        });

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


exports.isSignedIn = (req, res) => {
    expressJwt({
      secret: process.env.SECRET_KEY,
      algorithms: ["RS256"],
      userProperty: "auth",
    });
}

exports.isAuthenticated = (req, res, next) => {
    const checker = req.profile && req.auth && req.profile._id == req.auth.__id;
    if (!checker) {
      return res.status(403).json({
        error: "Access denied",
      });
    }
    next();
}