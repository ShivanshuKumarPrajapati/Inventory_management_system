const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        required: true,
        trim: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    }
}, { timestamps: true });

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;