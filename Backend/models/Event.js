const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    imageUrl: { type: String },
    eventTime: { type: String },
    location: { type: String },
    linkUrl: { type: String },
    isActive: { type: Boolean, default: true },
    displayOrder: { type: Number, default: 1 },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Event', eventSchema, 'Events');