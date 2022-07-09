const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const { signupUser, signinUser, signout } = require("./../controllers/auth");

router.post(
  "/signup",
  [
    check("name")
      .isLength({ min: 3 })
      .withMessage("name is too short. Min length required is 3"),
    check("password")
      .isLength({ min: 6 })
      .withMessage("Password must be of 6 character"),
    check("email")
      .isEmail()
      .withMessage("Email must be valid email address")
      .not()
      .isEmpty()
      .withMessage("Email is required"),
  ],
  signupUser
);

router.post("/signin", [
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be of 6 character"),
  check("email")
    .isEmail()
    .withMessage("Email must be valid email address")
    .not()
    .isEmpty()
    .withMessage("Email is required"),
],
    signinUser);


router.get('/signout', signout);

module.exports = router;
