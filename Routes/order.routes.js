const { orderController } = require("../controllers");
const { auth } = require("../middleware");

const router = require("express").Router();

router.post('/createOrder', auth, orderController.createOrder);

module.exports = router;