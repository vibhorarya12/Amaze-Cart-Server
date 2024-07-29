const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email : {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  paymentMode: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  products: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: "Products",
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],

  paymentData: {
    paymentStatus: {
      type: String,
      enum: ['Pending', 'Completed', 'Failed'],
      default: 'Pending',
      required: true,
    },
    paymentId: {
      type: String,
      default: '',
    
      
    },
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the Order model
const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
