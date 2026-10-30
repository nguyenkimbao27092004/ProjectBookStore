const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// API Tạo đơn hàng mới (POST /api/orders)
router.post('/', async (req, res) => {
    try {
        const { orderCode, customerInfo, items, totalAmount, paymentMethod, paymentStatus } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({ message: 'Giỏ hàng đang trống!' });
        }

        const newOrder = new Order({
            orderCode,
            customerInfo,
            items,
            totalAmount,
            paymentMethod,
            paymentStatus
        });

        const savedOrder = await newOrder.save();
        res.status(201).json({
            message: 'Đặt hàng thành công!',
            order: savedOrder
        });
    } catch (error) {
        console.error('Lỗi tạo đơn hàng:', error);
        res.status(500).json({ message: 'Lỗi server khi tạo đơn hàng', error: error.message });
    }
});

// API Lấy danh sách đơn hàng (GET /api/orders)
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi lấy danh sách đơn hàng', error: error.message });
    }
});

module.exports = router;