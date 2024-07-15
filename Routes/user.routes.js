const {userController} = require('../controllers/index')

const router = require('express').Router();

router.post('/checkExisting', userController.checkExisting);
router.post('/registerUser', userController.registerUser);
router.post('/loginUser', userController.loginUser);

module.exports = router;