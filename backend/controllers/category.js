const Category = require('./../models/category');
const Product = require('./../models/product');
const { validationResult } = require('express-validator');

exports.getCategoryId = (req, res, next, id) => {
    
    Category.findById(id).exec((err, category) => {
        if (err) {
            return res.status(400).json({
                error: "Category not FOUND"
            });
        }

        req.category = category;
        next();
    })
}

exports.createCategory = (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0].msg });
    }
    
    Category.countDocuments({ name: req.body.name })
        .then((count) => {
            if (count) {
                return res.status(400).json({ error: "Category already exist" });
            } else {
                const category = new Category(req.body);
                category.save((err, ctgry) => {
                    if (err) {
                        return res.status(400).json({
                            error: "Unable to create category"
                        });
                    }

                    return res.json({
                        mssg: 'Category created successfully'
                    });
                });
            }
        })
        .catch(err => {
            return res.status(500).json({
                error: "Unable to access DB"
            });
    })
}

exports.getCategory = (req, res) => {
  return res.json(req.category);
};

exports.getAllCategories = (req, res) => {
    
    Category.find().exec((err, category) => {
        if (err) {
            return res.status(400).json({
                error: "Unable to access to category from DB"
            });
        }

        return res.json(category);
    });
}


exports.updateCategory = (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0].msg });
    }

    Category.findByIdAndUpdate(req.category._id,
        { $set: req.body },
        { new: true, useFindAndModify: false },
        (err, user) => {
            if (err) {
                return res.status(400).json({
                    error: "Update Failed. Try again later",
                });
            }
            return res.json('Category updated successfully');
        }
    );
}


exports.removeCategory = (req, res) => {
    
    const category = req.category;
    const id = req.category._id;
    
    category.remove((err, updatedCategory) => {
      if (err) {
        return res.status(400).json({
          error: "Failed to delete category",
        });
      }
        

    //same category product deletion

    Product.find().exec((err, product) => {
    if (err) {
        return res.status(500).json({
        error: "Server error"
        });
    }

    product.map((item) => {
        if (item.category.equals(id)) {
        item.remove((err, updatedProduct) => {
            if (err) {
            return res.status(404).json({
                error: "Unable to remove Product of given category"     
            });
            }
        });
        }
    });
    });

        
      res.json({
        error: "Successfully deleted",
      });
    });

}