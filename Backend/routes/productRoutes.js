const express = require('express');
const router = express.Router();
// Cập nhật import đủ 5 hàm từ controller
const { getProducts, getProductById, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');

// Import Middleware kiểm tra Admin
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');

// Route công khai (Ai cũng xem được)
router.get('/', getProducts);
router.get('/:id', getProductById);

// Route Admin (Bắt buộc phải có Token và Quyền Admin)
router.post('/', verifyToken, isAdmin, createProduct);
router.put('/:id', verifyToken, isAdmin, updateProduct);
router.delete('/:id', verifyToken, isAdmin, deleteProduct);

module.exports = router;