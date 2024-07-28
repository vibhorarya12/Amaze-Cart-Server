const router = require('express').Router();

const productsRouter = require('./products.routes');
const userRouter = require('./user.routes');
const orderRoutes = require('./order.routes');


router.use('/products', productsRouter);
router.use('/user', userRouter)
router.use('/order', orderRoutes);
module.exports = router;