const mongoose = require('mongoose');
const ObjectId = mongoose;

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
    trim: true,
  },
  stock: {
    type: Number,
    required: true,
    trim: true,
    },
  sold: {
        type: Number,
        default:0
  },
  photo: {
    data: Buffer,
    contentType: String,
    },
    category: {
        type: ObjectId,
        ref: 'Category',
        required:true
    }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;