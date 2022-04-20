const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var userSchema = new Schema(
    {
        userName : {
            type: String,
            required: true
        },
        emailId : {
            type: String,
            required: true,
            unique: true
        },
        mobileNum : {
            type: Number,
            required: true
        },
        password : {
            type: String,
            required: true
        },
        subscription: {
            plan : {
                type: String,
                required: false
            },
            price : {
                type: Number,
                required: false
            }
        }
    }
)

module.exports = mongoose.model('users', userSchema);