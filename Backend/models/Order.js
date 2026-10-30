const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderCode: { type: String, required: true, unique: true },
    customerInfo: {
        fullName: { type: String, required: true },
        phone: { type: String, required: true },
        email: { type: String },
        address: { type: String, required: true },
        note: { type: String }
    },
    items: [
        {
            productId: { type: String },
            title: { type: String, required: true },
            price: { type: Number, required: true },
            quantity: { type: Number, required: true },
            image: { type: String }
        }
    ],
    totalAmount: { type: Number, required: true },
    paymentMethod: { type: String, enum: ['QR', 'COD'], default: 'QR' },
    paymentStatus: { type: String, enum: ['Pending', 'Paid'], default: 'Pending' },
    orderStatus: { type: String, default: 'Đang xử lý' },
    createdAt: { type: Date, default: Date.now }
});

// Liên kết trực tiếp vào collection 'Orders' trong KobosDB
module.exports = mongoose.model('Order', orderSchema, 'Orders');