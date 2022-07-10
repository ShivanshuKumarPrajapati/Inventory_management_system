const express = require("express");
const router = express.Router();
const { check } = require("express-validator");


const { getUserById } = require("./../controllers/user");
const { isSignedIn, isAuthenticated } = require("../controllers/auth");
const {
  createCategory,
  getAllCategories,
  updateCategory,
  removeCategory,
  getCategoryId,
  getCategory
} = require("../controllers/category");


router.param("userId", getUserById);
router.param('categoryId', getCategoryId);


router.post(
  "/category/create/:userId",
  isSignedIn,
  (err, req, res, next) => {
    if (err.name === 'UnauthorizedError') { 
      return(res.status(401).send('Invalid authorization token'));
    }
    next();
  },
  isAuthenticated,
  [
    check("name")
      .isLength({ min: 3 })
      .withMessage("Category name must contain atleast 3 char"),
    check("description")
      .isLength({ min: 3 })
      .withMessage("Description must contain atleast 3 char"),
  ],
  createCategory
);

router.get("/category/all/:userId", isSignedIn, isAuthenticated, getAllCategories);

router.get("/category/:categoryId/:userId", getCategory);

router.put(
  "/category/update/:categoryId/:userId",
  isSignedIn,
  isAuthenticated,
  [
    check("name")
      .isLength({ min: 3 })
      .withMessage("Category name must contain atleast 3 char"),
    check("description")
      .isLength({ min: 3 })
      .withMessage("Description must contain atleast 3 char"),
  ],
  updateCategory
);


router.delete(
  "/category/delete/:categoryId/:userId",
  isSignedIn,
  isAuthenticated,
  removeCategory
);

module.exports = router;
