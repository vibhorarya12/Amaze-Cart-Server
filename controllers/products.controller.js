const { Products , User} = require("../models");
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const getAllProducts = async (req, res) => {
  try {
    const products = await Products.find({});
    console.log("length is <<<<<<< ", products.length);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addProduct = async (req, res) => {
  try {
    const newProduct = new Products(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getProductsByCategoryName = async (req, res) => {
  const categoryName = req.params.categoryName;
  try {
    const products = await Products.find({ "category.name": categoryName });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



const addToWishlist = async (req, res , next) => {
  const {  productId } = req.body;

  try {
    // Find user by ID
    console.log( "user data is  <<<<<<<", req.userData)
    const user = await User.findById(req.userData.id);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    // Find product by ID
    const product = await Products.findById(productId);
    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }

    // Add product to user's wishlist if not already present
    if (!user.wishList.includes(productId)) {
      user.wishList.push(productId);
      await user.save();
    } else {
      return res.status(400).send({ message: "Product already in wishlist" });
    }

    // Send response with added product details
    res.status(200).send({
      message: 'Product added to wishlist successfully',
      product,
    });
  } catch (error) {
    console.error("Error adding product to wishlist:", error.message);
    res.status(500).send({ message: "Internal server error" });
  }
};
;


const getWishListProducts = async (req, res, next) => {
  try {
    // Find user by ID
    const user = await User.findById(req.userData.id).populate('wishList');
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    // Send response with the wishlist products
    res.status(200).json(user.wishList);
  } catch (error) {
    console.error("Error fetching wishlist products:", error.message);
    res.status(500).send({ message: "Internal server error" });
  }
};




const testingController = async (req, res) => {
  try {
    res.status(201).json({ message: "this is testimg controller" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};





module.exports = {
  getAllProducts,
  addProduct,
  testingController,
  getProductsByCategoryName,
  addToWishlist,
  getWishListProducts
};
