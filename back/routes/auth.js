const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/validate-session', authController.validateSession);

module.exports = router;