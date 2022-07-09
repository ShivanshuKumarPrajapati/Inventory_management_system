const express = require('express');
const router = express.Router();

const { getUserById } = require("./../controllers/user");
const { isSignedIn, isAuthenticated } = require("../controllers/auth");
const { getProductId, createProduct,removeProduct,updateProduct,getAllProduct,getProduct,photo } = require('../controllers/product');


router.param('userId', getUserById);
router.param('productId', getProductId);


router.post(
  "/product/create/:userId",
  isSignedIn,
  isAuthenticated,
  createProduct
);

router.get(
  "/product/:productId/:userId",
  isSignedIn,
  isAuthenticated,
  getProduct
);

router.get(
  "/product/photo/:productId/:userId",
  isSignedIn,
  isAuthenticated,
  photo
);

router.get(
  "/products/:userId",
  isSignedIn,
  isAuthenticated,
  getAllProduct
);


//delete routes
router.delete(
  "/product/delete/:productId/:userId",
  isSignedIn,
  isAuthenticated,
  removeProduct
);

//update routes
router.put(
    "/product/update/:productId/:userId", 
  isSignedIn,
  isAuthenticated,
  updateProduct
);

            
module.exports = router;