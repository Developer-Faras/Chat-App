// User Models
const { Schema, model} = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Name Is Required'],
        minLength: [3, 'Name Must Contains 3 Caracters']
    },
    email: {
        type: String,
        trim: true,
        required: [true, 'Email Is Required'],
        unique: [true, 'Email Allready Taken']
    },
    phone: {
        type: String,
        trim: true,
        required: [true, 'Phone Is Required'],
        unique: [true, 'Phone Allready Taken']
    },
    password: {
        type: String,
        trim: true,
        required: [true, 'Password Is Required'],
        set: (v) => {
            return bcrypt.hashSync(v, bcrypt.genSaltSync(8));
        }
    },
    avatar: {
        name: {
            type: String,
            default: 'default.png',
            trim: true
        },
        path: {
            type: String,
            trim: true,
            default: '/uploads/avatar/default.png'
        }
    },
    role: {
        type: String,
        enum: ['user', 'admin']
    }
},{
    timestamps: true
});

const USER = model('User', UserSchema);
module.exports = USER;