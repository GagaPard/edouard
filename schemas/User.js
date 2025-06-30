const mongoose = require('mongoose')
const { Schema } = mongoose

const User = new Schema({
    username : String,
    email : String,
    adresse : String,
    password : String,
    role : String,
    tag : [ Tags ],
    tagCategory : [ TagCategory ],
    wishlist : [ Wishlist ],
    lastLoginAt : Date,
    updatedAt : Date,
    createdAt : Date
})


