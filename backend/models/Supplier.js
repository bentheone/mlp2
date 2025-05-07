const mongoose = require('mongoose');
const supplierSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    suppliedBooks:[
        {
            type: mongoose.Types.ObjectId,
            ref: 'Book'
        }
    ],

}, {timestamps: true});

module.exports = mongoose.model('Supplier', supplierSchema);