const {userController} = require('../controllers/index')
const {auth} = require('../middleware');

const router = require('express').Router();

router.post('/checkExisting', userController.checkExisting);
router.post('/registerUser', userController.registerUser);
router.post('/loginUser', userController.loginUser);
router.put('/updateAddress', auth, userController.updateAddress)

module.exports = router;