require('dotenv').config()
const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const SALT_ROUNDS = 6

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { 
        type: String, 
        required: true, 
        minLength: 4,
        trim: true
    },
}, {
    timestamps: true,
    toJSON: {
        transform (doc, ret){
            delete ret.password;
            return ret;
        }
    }
})

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
    return next();
  });


module.exports = mongoose.model('User', userSchema)