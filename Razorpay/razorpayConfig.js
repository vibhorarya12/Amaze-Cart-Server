const dotenv = require('dotenv');

const Razorpay = require('razorpay');

dotenv.config();

const RazorPay_API_KEY = process.env.RazorPay_API_KEY;
const RazorPay_Secret = process.env.RazorPay_Secret;

 const instance = new Razorpay({
    key_id: RazorPay_API_KEY,
    key_secret: RazorPay_Secret,
  });

  module.exports = {instance}
