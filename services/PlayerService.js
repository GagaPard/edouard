const PlayerSchema = require('../schemas/Player')
const mongoose = require('mongoose')


// Compile model from schema
const Player = mongoose.model("Player", PlayerSchema);

module.exports.getAllPlayers = async () => {
    return await Player.find()
}

module.exports.getPlayer = async (playerId) => {
    return await Player.findById(playerId)
}

module.exports.getPlayersByFilter = async (filter) => {
    return await Player.find(filter)
}

module.exports.createPlayer = async (playerData) => {
    const player = new Player(playerData)
    return await player.save()
}

module.exports.createPlayers = async(playersData) => {
    for (const data of playersData) {
        const player = new Player(data)
        await player.validate()     //valide le schéma comme runValidators en gros
    }
    return await Player.insertMany(playersData, { ordered: true }) //ordered : true fait s'arrêter le process à la moindre erreur
}

module.exports.deletePlayer = async (playerId) => {
    let result = await Player.findByIdAndDelete(playerId)
    if (!result)
        throw {type: 'NOT_FOUND', message: 'Impossible de trouver le player à supprimer.'}
    return result
}

module.exports.deletePlayersByFilter = async (filter) => {
    const result = await Player.deleteMany(filter)

    if (!result.acknowledged)
        throw { type: 'DB_ERROR', message: 'Requête impossible.' }

    if (result.deletedCount === 0)
        throw { type: 'NOT_FOUND', message: 'Aucun player trouvé à supprimer.' }

    return result
}

module.exports.modifyPlayer= async (playerId, updatedData) => {
    const result = await Player.findByIdAndUpdate(playerId, updatedData, {
        new: true,              //Retourne le document après modification
        runValidators: true     //Oblige à respeceter les règles imposées dans le schéma (exemple : le type)
    })
    if (!result)
        throw {type: 'NOT_FOUND', message: 'Impossible de trouver le player à supprimer.'}
    return result
}

module.exports.modifyPlayersByFilter = async (filter, updateData) => {
    const playersToUpdate = await Player.find(filter).select('_id')
    const ids = playersToUpdate.map(p => p._id)

    if (ids.length === 0)
        throw {type: 'NOT_FOUND', message: 'Aucun player trouvé à supprimer.'}

    await Player.updateMany({ _id: { $in: ids } }, updateData, { runValidators: true })
    return Player.find({ _id: { $in: ids } })
}

