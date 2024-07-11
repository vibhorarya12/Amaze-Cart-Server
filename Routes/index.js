const router = require('express').Router();

const productsRouter = require('./products.routes');


router.use('/products', productsRouter);

module.exports = router;