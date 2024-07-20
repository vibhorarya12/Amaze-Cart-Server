const { productsController } = require('../controllers');
const { auth } = require('../middleware');

const router = require('express').Router();
router.get('/getAllProducts', productsController.getAllProducts );
router.post('/addProduct', productsController.addProduct );
router.post('/testing', productsController.testingController );
router.get('/category/:categoryName', productsController.getProductsByCategoryName);
router.post('/addtoWhishlist',auth, productsController.addToWishlist);
router.post('/getWishListProducts', auth,productsController.getWishListProducts);
router.post('/removeFromWishList', auth,productsController.removeFromWishList);

module.exports = router