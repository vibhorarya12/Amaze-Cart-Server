const { Products } = require("../models");



const getAllProducts = async (req, res) => {
    try {
      const products = await Products.find({});
      console.log('length is <<<<<<< ',  products.length);
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
  
const testingController  = async (req, res)=>{

   
  try {
   
    res.status(201).json({message :'this is testimg controller'});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

}

  module.exports= {getAllProducts, addProduct, testingController}