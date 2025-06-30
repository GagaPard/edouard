const PlayerSchema = require('../schemas/Player')
const mongoose = require('mongoose')


// Compile model from schema
const Player = mongoose.model("Player", PlayerSchema);

module.exports.getAllPlayers = async () => {
    return await Player.find()
}

module.exports.createPlayer = async (playerData) => {
    const player = new Player(playerData)
    return await player.save()
}