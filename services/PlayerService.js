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

module.exports.deletePlayer = async (playerId) => {
   let result = await Player.findByIdAndDelete(playerId)
   if (!result)
        throw {type: 'NOT_FOUND', message: 'Impossible de trouver le player a supprimer.'}
    return result
}