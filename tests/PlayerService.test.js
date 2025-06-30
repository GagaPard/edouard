const PlayerService = require('../services/PlayerService')

const mongoose = require('mongoose')

main().catch(err => console.log(err));

var users = []

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/test');
    await createPlayer({})
    await createPlayer({username: "Louis"})
        await createPlayer([{username: "Louis"}])
    await deletePlayer("Edoaurd")
    await deletePlayer("68623fa5d7eff9810f11602f")
    await deletePlayer(users[0]?._id)
}

async function createPlayer(body) {
    try {
        let res = await PlayerService.createPlayer(body)
        users.push(res)
        console.log('Player ajouté')
    }
    catch (err) {
        console.log('Player non ajouté, probleme :', err?.message)
    }
}

async function deletePlayer(id) {
      try {
        let res = await PlayerService.deletePlayer(id)
        console.log('Player supprimer')
    }
    catch (err) {
        console.log('Player non supprimer, probleme :', err?.message)
    }
}