const { Products, User } = require("../models");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const axios = require("axios");
const cheerio = require("cheerio");
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

const addToWishlist = async (req, res, next) => {
  const { productId } = req.body;

  try {
    // Find user by ID
    console.log("user data is  <<<<<<<", req.userData);
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
      message: "Product added to wishlist successfully",
      product,
    });
  } catch (error) {
    console.error("Error adding product to wishlist:", error.message);
    res.status(500).send({ message: "Internal server error" });
  }
};
const getWishListProducts = async (req, res, next) => {
  try {
    // Find user by ID
    const user = await User.findById(req.userData.id).populate("wishList");
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

const removeFromWishList = async (req, res, next) => {
  const { productId } = req.body;
  try {
    const user = await User.findById(req.userData.id);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const productIndex = user.wishList.indexOf(productId);
    if (productIndex === -1) {
      return res.status(404).send({ message: "Product not in wishlist" });
    }

    user.wishList.splice(productIndex, 1);
    await user.save();

    res
      .status(200)
      .send({ message: "Product removed from wishlist successfully" });
  } catch (error) {
    console.error("Error removing product from wishlist:", error.message);
    res.status(500).send({ message: "Internal server error" });
  }
};


const testingController = async (req, res) => {
  const { url, category } = req.body;

  try {
    const response = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
    });
    const $ = cheerio.load(response.data);

    // Extracting the product title
    const productTitle = $("#productTitle").text().trim();

    // Extracting the product price
    const productPrice = $(".a-price-whole")
      .first()
      .text()
      .trim()
      .replace(/[^0-9.]/g, "");

    // Extracting main image URLs
    const mainImageUrls = [];
    $("#imgTagWrapperId img").each((i, element) => {
      const imgSrc = $(element).attr("src");
      if (imgSrc) {
        mainImageUrls.push(imgSrc);
      }

      const dataDynamicImage = $(element).attr("data-a-dynamic-image");
      if (dataDynamicImage) {
        const dynamicImageUrls = Object.keys(JSON.parse(dataDynamicImage));
        mainImageUrls.push(...dynamicImageUrls);
      }
    });

    // Extracting product description
    const productDescription =
      $("#productDescription p").text().trim() || productTitle;

    const productData = {
      title: productTitle,
      price: parseFloat(productPrice), // Convert to number
      description: productDescription,
      images: mainImageUrls,
      category: {
        name: category,
        image: mainImageUrls[0] || "",
      },
    };

    const newProduct = new Products(productData);
    await newProduct.save();

    res.status(200).send({ message: "Product added successfully!" });
  } catch (error) {
    console.error("Error in testingController:", error);
    res
      .status(500)
      .send({ message: "An error occurred while processing your request." });
  }
};



// get text sugggestion on search input
const getSuggestions = async (req, res, next) => {
  const { query } = req.body;

  if (!query) {
      return res.status(400).send({ message: 'Query is required' });
  }

  try {
      // Create a regex pattern for case-insensitive partial matching
      const regex = new RegExp(query, 'i');

      // Find matching products based on title or category name using regex
      const suggestions = await Products.find({
          $or: [
              { title: { $regex: regex } },
              { 'category.name': { $regex: regex } }
          ]
      }).limit(10);

      if (!suggestions || suggestions.length === 0) {
          return res.status(404).send({ message: 'No matching products found' });
      }

      // Send success response with suggestions
      return res.status(200).send({ message: 'Suggestions retrieved successfully', suggestions });
  } catch (error) {
      // Handle errors
      console.error(error);
      return res.status(500).send({ message: 'Internal server error' });
  }
};


module.exports = {
  getAllProducts,
  addProduct,
  testingController,
  getProductsByCategoryName,
  addToWishlist,
  getWishListProducts,
  removeFromWishList,
};

module.exports = {
  getAllProducts,
  addProduct,
  testingController,
  getProductsByCategoryName,
  addToWishlist,
  getWishListProducts,
  removeFromWishList,
  getSuggestions
};
