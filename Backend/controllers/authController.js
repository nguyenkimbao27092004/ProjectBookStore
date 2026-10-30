const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); 

exports.signup = async (req, res) => {
    try {
        const { username, email, address, password } = req.body;

        // 1. Kiểm tra email hoặc username đã tồn tại chưa
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: "Email này đã được sử dụng!" });
        }

        // 2. Băm (mã hóa) mật khẩu trước khi lưu
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        // 3. Khởi tạo User mới với đầy đủ thông tin
        const newUser = new User({
            username,
            email,
            passwordHash
        });

        // 4. Lưu vào MongoDB
        await newUser.save();

        res.status(201).json({ message: "Đăng ký thành công!" });
    } catch (error) {
        console.error("Lỗi đăng ký:", error);
        res.status(500).json({ message: "Lỗi Server!" });
    }
    
};
exports.signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Email không tồn tại!" });

        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) return res.status(400).json({ message: "Sai mật khẩu!" });

        const token = jwt.sign({ id: user._id }, 'kobos_secret_key', { expiresIn: '1d' });

        // ĐÃ SỬA DÒNG NÀY: Trả thêm thông tin 'role' về cho giao diện
        res.status(200).json({ 
            message: "Đăng nhập thành công!", 
            token, 
            username: user.username, 
            role: user.role 
        });
    } catch (error) {
        console.error("Lỗi đăng nhập:", error);
        res.status(500).json({ message: "Lỗi Server!" });
    }
};