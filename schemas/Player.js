const mongoose = require('mongoose')
const { Schema } = mongoose

const PlayerSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    score: {
        type: Number,
        min: 0,
        required: true,
        default: 0
    },
    updatedAt: {
        type: Date,
        required: true,
        default: new Date()
    },
    createdAt: {
        type: Date,
        required: true,
        default: new Date()
    }
})

module.exports = PlayerSchema