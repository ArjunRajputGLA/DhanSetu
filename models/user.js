const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    gender: { type: String, required: true, enum: ['male', 'female', 'other', 'prefer-not-to-say'] },
    address: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zipCode: { type: String, required: true }
    },
    createdAt: { type: Date, default: Date.now },
    resetPasswordToken: String,
    resetPasswordExpires: Date
});

const userModel = mongoose.model('Users', userSchema)
module.exports = userModel