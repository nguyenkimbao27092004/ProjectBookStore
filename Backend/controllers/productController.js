const Product = require('../models/Product');

// API lấy toàn bộ sách
const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Lỗi Server", error: error.message });
    }
};

// API lấy chi tiết 1 quyển sách theo ID
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Không tìm thấy sách" });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: "Lỗi Server", error: error.message });
    }
};

// API Thêm sách mới (Admin)
const createProduct = async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.status(201).json({ message: "Thêm sách thành công!", product: newProduct });
    } catch (error) {
        res.status(500).json({ message: "Lỗi thêm sách", error: error.message });
    }
};

// API Cập nhật sách (Admin)
const updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ message: "Cập nhật thành công!", product: updatedProduct });
    } catch (error) {
        res.status(500).json({ message: "Lỗi cập nhật", error: error.message });
    }
};

// API Xóa sách (Admin)
const deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Đã xóa sách!" });
    } catch (error) {
        res.status(500).json({ message: "Lỗi xóa sách", error: error.message });
    }
};

// Cập nhật dòng export để xuất đủ 5 hàm
module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct };