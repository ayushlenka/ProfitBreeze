const mongoose = require('mongoose');

const schema = mongoose.Schema;

const sellerSettings = new schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    googleId :{
        type: String,
        required: true,
        unique: true,
    },
    sellingLocation : {
        type: String,
        required: false,
        default: 'Select your location'
    },
    stockXSellerRating: {
        type: Number,
        type: String,
        required: false,
        default: 'Select your level'
    },
    goatSellerLevel : {
        type: Number,
        type: String,
        required: false,
        default: 'Select your rating'
    },
}, 
{timestamps: true})

module.exports = mongoose.model('SellerSettings', sellerSettings);