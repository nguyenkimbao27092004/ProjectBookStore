const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

const SECRET_KEY = "kobos_secret_key_2024"

// Kết nối tới MongoDB (Đã đổi sang KobosDB)
mongoose.connect('mongodb://127.0.0.1:27017/KobosDB')
    .then(() => console.log('Đã kết nối thành công với MongoDB (KobosDB)!'))
    .catch(err => console.error('Lỗi kết nối MongoDB:', err));

// ==========================================
// 1. KHAI BÁO SCHEMA CHO COLLECTION PRODUCTS
// ==========================================
const productSchema = new mongoose.Schema({
    title: String,
    author: String,
    price: Number,
    image: String,
    nhaCungCap: String,
    nhaXuatBan: String,
    hinhThucBia: String,
    stock: { type: Number, default: 0 },
    description: String,
    categories: [String]
});
const Product = mongoose.model('Product', productSchema, 'Products');

// ==========================================
// 2. KHAI BÁO SCHEMA CHO COLLECTION USERS
// ==========================================
const userSchema = new mongoose.Schema({
    username: { type: String, unique: true }, 
    email: { type: String, unique: true },    
    passwordHash: String,
    role: { type: String, default: 'user' },
    fullName: String,
    phone: String,
    cart: [{
        productId: mongoose.Schema.Types.ObjectId,
        quantity: Number
    }],
    bookmarks: [mongoose.Schema.Types.ObjectId],
    createdAt: { type: Date, default: Date.now }
});
const User = mongoose.model('User', userSchema, 'Users');
app.post('/api/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        
        // Kiểm tra trùng lặp
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'Email hoặc Tên đăng nhập đã tồn tại!' });
        }

        // Mã hóa mật khẩu
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        // Lưu user mới
        const newUser = new User({ username, email, passwordHash });
        await newUser.save();

        res.status(201).json({ success: true, message: 'Đăng ký thành công!' });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});
// ==========================================
// API ĐĂNG NHẬP (SIGN IN)
// ==========================================
app.post('/api/signin', async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Chỉ tìm user theo email
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).json({ success: false, message: 'Email không tồn tại trong hệ thống!' });
        }

        // 2. Chặn các tài khoản cũ chưa được mã hóa mật khẩu thực sự
        if (user.passwordHash === "mat_khau_da_ma_hoa") {
            return res.status(400).json({ success: false, message: 'Tài khoản admin cũ không hợp lệ. Vui lòng tạo tài khoản mới!' });
        }

        // 3. So sánh mật khẩu bằng bcrypt
        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Mật khẩu không đúng!' });
        }

        // 4. Tạo token (Nếu lỗi ở bước này do thiếu thư viện, nó sẽ nhảy xuống catch)
        const token = jwt.sign({ userId: user._id, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
        
        // Ưu tiên hiển thị fullName (cho admin) hoặc username (cho user mới) trên thanh Header
        const displayName = user.fullName || user.username; 
        
        res.json({ success: true, message: 'Đăng nhập thành công!', token, username: displayName });
    } catch (err) {
        // Bắt lỗi Server và gửi về Frontend để dễ dàng biết bạn đang thiếu gì
        console.error("Lỗi đăng nhập:", err);
        res.status(500).json({ success: false, message: `Lỗi Server: ${err.message}` });
    }
});

// ==========================================
// 3. KHAI BÁO SCHEMA CHO COLLECTION ORDERS
// ==========================================
const orderSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    items: [{
        productId: mongoose.Schema.Types.ObjectId,
        title: String,
        price: Number,
        quantity: Number
    }],
    totalAmount: Number,
    shippingAddress: {
        receiverName: String,
        phone: String,
        address: String
    },
    paymentMethod: String,
    status: { type: String, default: 'Pending' },
    createdAt: { type: Date, default: Date.now }
});
const Order = mongoose.model('Order', orderSchema, 'Orders');

// ==========================================
// 4. KHAI BÁO SCHEMA CHO COLLECTION EVENTS
// ==========================================
const eventSchema = new mongoose.Schema({
    title: String,
    imageUrl: String,
    eventTime: String,
    location: String,
    linkUrl: String,
    isActive: { type: Boolean, default: true },
    displayOrder: Number,
    createdAt: { type: Date, default: Date.now }
});
const Event = mongoose.model('Event', eventSchema, 'Events');


// ==========================================
// CÁC API ENDPOINT XỬ LÝ YÊU CẦU TỪ FRONTEND
// ==========================================

// API Lấy danh sách Sách (Truyện)
app.get('/api/books', async (req, res) => {
    try {
        const books = await Product.find();
        res.json(books);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// API Lấy danh sách Sự kiện/Banner đang kích hoạt
app.get('/api/events', async (req, res) => {
    try {
        // Chỉ lấy các event có isActive = true và sắp xếp theo thứ tự hiển thị
        const events = await Event.find({ isActive: true }).sort({ displayOrder: 1 });
        res.json(events);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Route mặc định chuyển hướng về trang chủ
app.get('/', (req, res) => {
    res.redirect('/html/home.html');
});

// Khởi chạy Server
app.listen(3000, () => {
    console.log('Server đang chạy tại http://localhost:3000');
});