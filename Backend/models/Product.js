const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String },
    price: { type: Number, required: true },
    image: { type: String },
    nhaCungCap: { type: String },
    nhaXuatBan: { type: String },
    hinhThucBia: { type: String },
    loaiSach: { type: String, required: true },
    theLoai: { type: String },
    moTa: { type: String }
}, { collection: 'Products' });

module.exports = mongoose.model('Product', productSchema);