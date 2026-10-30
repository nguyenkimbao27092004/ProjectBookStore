const jwt = require('jsonwebtoken');
const User = require('../models/User');

// 1. Hàm kiểm tra xem người dùng đã đăng nhập chưa (Có Token hợp lệ không)
exports.verifyToken = (req, res, next) => {
    const token = req.header('Authorization');
    
    if (!token) {
        return res.status(401).json({ message: "Từ chối truy cập. Bạn chưa đăng nhập!" });
    }

    try {
        // Cắt bỏ chữ "Bearer " để lấy đúng chuỗi token
        const verified = jwt.verify(token.replace('Bearer ', ''), 'kobos_secret_key');
        req.user = verified; // Lưu thông tin id của user vào req
        next(); // Cho phép đi tiếp đến hàm xử lý
    } catch (error) {
        res.status(400).json({ message: "Token không hợp lệ hoặc đã hết hạn!" });
    }
};

// 2. Hàm kiểm tra xem tài khoản có quyền Admin không
exports.isAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        
        if (!user || user.role !== 'admin') {
            return res.status(403).json({ message: "Cảnh báo: Bạn không có quyền Admin để thực hiện hành động này!" });
        }
        
        next(); // Là Admin, cho phép đi tiếp
    } catch (error) {
        res.status(500).json({ message: "Lỗi kiểm tra quyền Admin!" });
    }
};