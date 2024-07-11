const { productsController } = require('../controllers');


const router = require('express').Router();
router.get('/getAllProducts', productsController.getAllProducts );
router.post('/addProduct', productsController.addProduct );
router.post('/testing', productsController.testingController );

module.exports = router