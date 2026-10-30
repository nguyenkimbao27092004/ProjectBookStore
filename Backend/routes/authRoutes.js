const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Xử lý POST request từ form đăng ký
router.post('/signup', authController.signup);
router.post('/signin', authController.signin);

module.exports = router;