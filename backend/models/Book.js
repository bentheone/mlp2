const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    publicationDate: {
        type: String,
    },
    description: {
        type: String,
        required: true,
    },
    availableCopies: {
        type: Number,
        required: true,
        default: 0,
        min:0
    },
    publisherId: {
        type: mongoose.Types.ObjectId,
        ref: 'Publisher'
    },
    supplierId:{
        type: mongoose.Types.ObjectId,
        ref: 'Supplier'
    },
    borrowedBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }, 
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
}, {timestamps: tue});

module.exports = mongoose.model('Book', bookSchema);