const Category = require('./../models/category');
const { validationResult } = require('express-validator');

exports.getCategoryId = (req, res, next, id) => {
    
    Category.findById(id).exec((err, category) => {
        if (err) {
            return res.status(400).json({
                error: "Category not FOUND"
            });
        }

        category.description = undefined;

        req.category = category;
        next();
    })
}

exports.createCategory = (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array()[0].msg });
    }
    
    const category = new Category(req.body);
    category.save((err, ctgry) => {
        if (err) {
            return res.status(400).json({
                error: "Unable to create to category"
            });
        }

        return res.json({
            mssg: 'Category created successfully'
        });
    });
}

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
      return res.status(400).json({ errors: errors.array()[0].msg });
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
    category.remove((err, updatedCategory) => {
      if (err) {
        return res.status(400).json({
          error: "Failed to delete category",
        });
      }
      res.json({
        mssg: "Successfully deleted",
      });
    });

}