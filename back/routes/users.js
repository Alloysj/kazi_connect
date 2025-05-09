const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); 
const authController = require('../controllers/authController');

router.post('/login', authController.simpleLogin);
router.post('/register', userController.registerUser);

module.exports = router;

