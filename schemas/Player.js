const mongoose = require('mongoose')
const { Schema } = mongoose

const Player = new Schema({
    name : String,
    score : {type : Number, min : 0},
})