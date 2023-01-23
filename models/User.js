const { string } = require('joi')
const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please provide a name...🚚'],
        minlength: 3,
        maxlength: 50,
    },
    email: {
        type: String,
        required: [true, 'please provide an email...🚚'],
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'please provide valid email...🛑'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'please provide a password...🚚'],
        minlength: 6,
    }
}) 

module.exports = mongoose.model('User', UserSchema)