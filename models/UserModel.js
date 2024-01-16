// User Models
const { Schema, model} = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = Schema({
    name: String,
    email: String,
    phone: String,
    password: {
        type: String,
        set: (v) => {
            return bcrypt.hashSync(v, bcrypt.genSaltSync(8));
        }
    },
    avatar: String,
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
},
{
    timestamps: true
});

const USER = model('User', UserSchema);
module.exports = USER;