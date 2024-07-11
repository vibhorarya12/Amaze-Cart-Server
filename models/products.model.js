const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  images: { type: [String], required: true },
  creationAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  category: {
    id: { type: Number, required: true },
    name: { type: String, required: true },
    image: { type: String, required: true },
    creationAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  }
}, { collection: 'Products' });

const Products = mongoose.model('Products', productSchema);

module.exports = Products;
