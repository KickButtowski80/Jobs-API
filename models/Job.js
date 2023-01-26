const mongoose = require('mongoose')

const JobSchema = new mongoose.Schema({
    company: {
        type: String, 
        required: [true, '🤗...please provide company name'],
        maxlength: 50,
    },
    position: {
        type: String,
        required: [true, '🤗...please provide position name'],
        maxlength: 100,
    },
    status: {
        type: String,
        enum: ['interview', 'decliend', 'pending'],
        default: 'pending',
    },
    createBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, '🤗...please provide a user']
    }
}, {timestamps: true})


module.exports = mongoose.model('Job', JobSchema)