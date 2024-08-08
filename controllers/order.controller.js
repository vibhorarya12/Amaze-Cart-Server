const { Order, Products, User } = require("../models");
const { instance } = require("../Razorpay/razorpayConfig");


// controller to create an order 
const createOrder = async (req, res, next) => {
    try {
        // Extract order details from request body
        const userId = req.userData.id;
        const { name, phone,email, address, paymentMode, amount, products } = req.body;

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

        let paymentId = '';
        let paymentStatus = 'Pending';

        // Create Razorpay order if payment mode is not COD
        if (paymentMode !== 'Cash on delivery') {
            const options = {
                amount: amount * 100,  // amount in the smallest currency unit
                currency: "INR",
            };
            const order = await instance.orders.create(options);
            paymentId = order.id;
        } 
        
        // Create new order
        const newOrder = new Order({
            userId,
            name,
            phone,
            email,
            address,
            paymentMode,
            amount,
            products,
            paymentData: {
                paymentStatus,
                paymentId,
            }
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



// controller to confirm payment done via razorpay
const confirmPayment = async (req, res, next) => {
    const { orderId  , paymentStatus} = req.body;
    const { id: userId } = req.userData;
    try {
        // Find the order by ID
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).send({ message: 'Order ID not found!' });
        }

        // Check if the order belongs to the logged-in user
        if (order.userId.toString() !== userId) {
            return res.status(403).send({ message: 'Unauthorized access!' });
        }

        // Update the payment data
        order.paymentData.paymentStatus = paymentStatus;
       

        // Save the updated order
        await order.save();

        // Send success response
        return res.status(200).send({ message: 'Payment confirmed successfully', order });
    } catch (error) {
        // Handle errors
        console.error(error);
        return res.status(500).send({ message: 'Internal server error' });
    }
};


const getOrdersByUser = async (req, res, next) => {
    const { id: userId } = req.userData;
    try {
        // Find all orders by userId and populate the products field
        const orders = await Order.find({ userId }).populate('products.productId');
        if (!orders || orders.length === 0) {
            return res.status(200).send({ message: 'No orders found for this user!', orders: [] });
        }

        // Send success response with the orders
        return res.status(200).send({ message: 'Orders retrieved successfully', orders });
    } catch (error) {
        // Handle errors
        console.error(error);
        return res.status(500).send({ message: 'Internal server error' });
    }
};
module.exports = { createOrder , confirmPayment , getOrdersByUser};
