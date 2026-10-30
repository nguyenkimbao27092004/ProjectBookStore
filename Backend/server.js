const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path'); // Thêm thư viện quản lý đường dẫn
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());



// Khai báo các API Routes hiện tại của bạn...
const productRoutes = require('./routes/productRoutes');
app.use('/api/products', productRoutes);

// Gắn thêm Route xác thực (Auth)
const authRoutes = require('./routes/authRoutes');
app.use('/api', authRoutes); // Sẽ tạo thành /api/signup

const orderRoutes = require('./routes/orderRoutes');
app.use('/api/orders', orderRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server đang chạy tại PORT: ${PORT}`));

