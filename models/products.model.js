const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    id: { type: Number },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    images: { type: [String], required: true },
    creationAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    rating: { type: Number, default: 3.5 },
    category: {
      id: { type: Number },
      name: { type: String, required: true },
      image: { type: String, required: true },
      creationAt: { type: Date, default: Date.now },
      updatedAt: { type: Date, default: Date.now },
    },
  },
  { collection: "Products" }
);

productSchema.index({ title: "text", "category.name": "text" });

const Products = mongoose.model("Products", productSchema);

module.exports = Products;
