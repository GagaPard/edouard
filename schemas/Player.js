const mongoose = require('mongoose')
const { Schema } = mongoose

const Player = new Schema({
    username : {
        name : String,
        required: true,
        unique: true
    },
    score : {
        type : Number,
        min : 0,
        required: true,
        defaut : 0
    },
})