const { Order, Products, User } = require("../models");

const createOrder = async (req, res, next) => {
    try {
        // Extract order details from request body
        const  userId = req.userData.id;
        const { name, phone, address, paymentMode, amount, products } = req.body;

        // Validate required fields
        if (!name || !phone || !address || !paymentMode || !amount || !products) {
            return res.status(400).send({ message: "All fields are required" });
        }

        // Validate product IDs
        for (let product of products) {
            const productExists = await Products.findById(product.productId);
            if (!productExists) {
                return res.status(404).send({ message: `Product with ID ${product.productId} not found` });
            }
        }

        // Create new order
        const newOrder = new Order({
            userId,
            name,
            phone,
            address,
            paymentMode,
            amount,
            products,
        });

        // Save order to database
        await newOrder.save();

        // Send success response
        return res.status(200).send({ message: "Order created successfully", order: newOrder });

    } catch (error) {
        // Handle errors
        console.error(error);
        return res.status(500).send({ message: "Internal server error" });
    }
};

module.exports = { createOrder };
