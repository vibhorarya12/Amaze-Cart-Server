const router = require('express').Router();

const productsRouter = require('./products.routes');
const userRouter = require('./user.routes');


router.use('/products', productsRouter);
router.use('/user', userRouter)

module.exports = router;