const { orderController } = require("../controllers");
const { auth } = require("../middleware");

const router = require("express").Router();

router.post('/createOrder', auth, orderController.createOrder);
router.post('/confirmPayment' , auth, orderController.confirmPayment);
router.post('/getOrdersByUser' , auth, orderController.getOrdersByUser);

module.exports = router;