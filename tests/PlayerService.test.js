const PlayerService = require('../services/PlayerService')

const mongoose = require('mongoose')

main().catch(err => console.log(err));

var users = []

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/test')
    await createPlayers([{username : "Pablo", score : 1}, {username : "La petite soeur de Pablo", score: 130}, {username: "Edouard dans la piscine creusée", score: 100}])
}

async function createPlayer(body) {
    try {
        let res = await PlayerService.createPlayer(body)
        users.push(res)
        console.log('Player ajouté')
    }
    catch (err) {
        console.log('Player non ajouté, problème :', err?.message)
    }
}

async function createPlayers(listOfPlayers) {
    try {
        let res = await PlayerService.createPlayers(listOfPlayers)
        users.push(...res)
        console.log('Players ajoutés !')
    }
    catch (err) {
        console.log('Players non ajoutés : problème :', err?.message)
    }
}

async function deletePlayer(id) {
    try {
        let res = await PlayerService.deletePlayer(id)
        console.log('Player supprimé')
    }
    catch (err) {
        console.log('Player non supprimé, problème :', err?.message)
    }
}

async function deletePlayersByFilter(filter) {
    try {
        const result = await PlayerService.deletePlayersByFilter(filter)
        console.log(`${result.deletedCount} player(s) supprimé(s) avec succès !`)
    } catch (err) {
        console.log('Players non supprimés :', err?.message)
    }
}

async function deletePlayersByIds(ids) {
    try {
        const validIds = ids.filter(Boolean)

        if (validIds.length === 0) {
            console.log('Aucun ID rentré.')
            return
        }

        const result = await PlayerService.deletePlayersByFilter({ _id: { $in: validIds } })

        console.log(`${result.deletedCount} joueur(s) supprimé(s) avec succès.`)
    } catch (err) {
        console.log('Erreur lors de la suppression :', err?.message)
    }
}

async function modifyPlayer(id, update) {
    try {
        let res = await PlayerService.modifyPlayer(id, update)
        console.log(`Player modifié : ${res.username} avec un score de ${res.score}`)
    }
    catch (err) {
        console.log('Player non modifié, problème:', err?.message)
    }
}

async function modifyPlayersByFilter(filter, updateData) {
    try {
        const updatedPlayers = await PlayerService.modifyPlayersByFilter(filter, updateData)

        if (updatedPlayers.length === 0) {
            console.log('Aucun player modifié avec ce filtre.')
            return []
        }

        console.log(`${updatedPlayers.length} player(s) modifié(s) avec succès :`)
        updatedPlayers.forEach(player => {
            console.log(`- ${player.username} avec un score de ${player.score}`)
        })

        return updatedPlayers

    } catch (err) {
        console.log('Erreur lors de la modification des players :', err?.message)
        return []
    }
}

async function modifyPlayersByIds(ids, updateData) {
    try {
        const validIds = ids.filter(Boolean)

        if (validIds.length === 0) {
            console.log('Aucun ID fourni.')
            return []
        }

        const updatedPlayers = await PlayerService.modifyPlayersByFilter({ _id: { $in: validIds } }, updateData)

        if (updatedPlayers.length === 0) {
            console.log('Aucun player modifié pour ces IDs.')
            return []
        }

        console.log(`${updatedPlayers.length} player(s) modifié(s) avec succès :`)
        updatedPlayers.forEach(player => {
            console.log(`- ${player.username} avec un score de ${player.score}`)
        })
        return updatedPlayers

    } catch (err) {
        console.log('Erreur lors de la modification des players :', err?.message)
        return []
    }
}

async function getPlayer(id) {
    try {
        let res = await PlayerService.getPlayer(id)
        console.log(`Le joueur que tu recherches : ${res.username} avec un score de ${res.score}`)
    }
    catch (err) {
        console.log('Player non trouvé, problème:', err?.message)
    }
}

async function getPlayersByFilter(filter) {
    try {
        const players = await PlayerService.getPlayersByFilter(filter)

        if (!players.length) {
            console.log('Aucun player trouvé avec ce filtre.')
            return []
        }

        console.log(`${players.length} player(s) trouvé(s) avec succès :`)
        players.forEach(player => {
            console.log(`- ${player.username} avec un score de ${player.score}`);
        })
        return players
    } catch (err) {
        console.log('Erreur lors de la récupération des players :', err?.message)
        return []
    }
}

async function getPlayersByIds(ids) {
    try {
        const validIds = ids.filter(Boolean)

        if (validIds.length === 0) {
            console.log('Aucun ID rentré.')
            return []
        }

        const players = await PlayerService.getPlayersByFilter({ _id: { $in: validIds } });

        if (!players.length) {
            console.log('Aucun player trouvé pour ces IDs.')
            return []
        }

        console.log(`${players.length} player(s) trouvé(s) avec succès :`)
        players.forEach(player => {
            console.log(`- ${player.username} avec un score de ${player.score}`)
        })
        return players

    } catch (err) {
        console.log('Erreur lors de la récupération des players :', err?.message)
        return []
    }
}