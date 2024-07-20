const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;


// controller for checking an existing phone number in DB"
const checkExisting = async (req, res) => {
  try {
    let user = await User.findOne({ phone: req.body.phone });
    if (user === null) {
      return res.status(400).send({ message: "User not found register first" });
    } else {
      return res
        .status(200)
        .send({ message: "The phone number already exists" });
    }
  } catch (error) {
    console.error("Error checking for existing user:", error.message);
    return res.status(500).send({ message: "Internal server error" });
  }
};


// controller for registering users //
const registerUser = async (req, res) => {
    const userInfo = req.body;
  
    try {
      
      // Check if the user already exists
    let existingUser = await User.findOne({ phone: userInfo.phone });
    if (existingUser) {
      return res.status(400).send({ message: "The phone number already exists" });
    }
      // Create a new user
      const newUser = await User.create(userInfo);
  
      // Generate JWT token
      const token = jwt.sign(
        {
          phone: newUser.phone,
          id: newUser._id
        },
        JWT_SECRET,
       
      );
  
      // Send response
      res.status(200).send({
        message: 'User Registered Successfully',
        user: newUser,
        token,
      });
    } catch (error) {
      console.error("Error registering user:", error.message);
      res.status(500).send({ message: "Internal server error" });
    }
  };
  


// login controller //

const loginUser = async (req, res) => {
    const { phone } = req.body;
  
    try {
      // Check if the user exists
      const user = await User.findOne({ phone });
      if (!user) {
        return res.status(400).send({ message: "Invalid phone number" });
      }
  
      // Generate JWT token
      const token = jwt.sign(
        {
          phone: user.phone,
          id: user._id
        },
        JWT_SECRET,
       
      );
  
      // Send response
      res.status(200).send({
        message: 'Login Successful',
        user,
        token,
      });
    } catch (error) {
      console.error("Error logging in user:", error.message);
      res.status(500).send({ message: "Internal server error" });
    }
  };





  
module.exports = { checkExisting , registerUser, loginUser};
