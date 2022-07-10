const Product = require('./../models/product');
const formidable = require('formidable');
const _ = require('lodash');
const fs = require("fs");

exports.getProductId = (req, res, next, id) => {
    
  Product.findById(id)
    .populate('category')
    .exec((err, product) => {
        if (err) {
            return res.status(400).json({
                error: "Product not FOUND",
            });
        }

      req.product = product;
        next();
    });
}


exports.createProduct = (req, res) => {
    
    const form = new formidable.IncomingForm();
    form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
         return res.status(400).json({
        error: "Problem with Image!",
      });
    
    }
      
      const {name,price,stock,sold,category} =fields;

    if(
        !name ||
        !sold ||
        !price ||
        !category ||
        !stock
    ){
        return res.status(400).json({
            error: "Please include all fields"
        });
    }

    let product = new Product(fields);

    //handle file
    if(file.photo){
        if(file.photo.size > 3000000){
            return res.status(413).json({
                error:'File size tooo big!'
            });
        }

        product.photo.data = fs.readFileSync(file.photo.filepath)
        product.photo.contentType = file.photo.type;
    }
    
    //save to the DB
    product.save((err,product) => {
        if(err){
            return res.status(400).json({
                error : "Saving product in DB failed"
            });
        }
        res.json(product);
    });
  });
};


exports.getProduct = (req, res) => {
  req.product.photo = undefined;
  return res.json(req.product);
};

exports.photo = (req, res, next) => {
  console.log('photo');
     if (req.product.photo.data) {
       res.set("Content-Type", req.product.photo.contentType);
       return res.send(req.product.photo.data);
     }
     next();

}

exports.getAllProduct = (req, res) => {

  Product.find()
    .select("-photo")
    .populate('category')
    .exec((err, products) => {
      if (err) {
        return res.status(400).json({
          error: "Unable to access product from DB"
        });
      }
      res.json(products);
    });
};

exports.removeProduct = (req, res) => {
  let product = req.product;
  product.remove((err, deletedProduct) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to delete the product",
      });
    }

    res.status(200).json({
      mssg: "Product deleted successfully"
    });
  });
};


exports.updateProduct = (req, res) => {
  const form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "Problem with Image!",
      });
    }

      
      let product = req.product;
      product = _.extend(product, fields);

    
    //handle file
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "File size tooo big!",
        });
      }

      product.photo.data = fs.readFileSync(file.photo.filepath);
      product.photo.contentType = file.photo.type;
    }

    //save to the DB
    product.save((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "Updation of product in DB failed",
        });
      }
        res.json(product);        
    });
  });
};
