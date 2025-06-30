const PlayerService = require('../services/PlayerService')

const mongoose = require('mongoose')

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/test');
    createPlayer()
}

async function createPlayer() {
    try {
        await PlayerService.createPlayer({})
        console.log('Player ajouté')
    }
    catch (err) {
        console.log('Player non ajouté, probleme :', err?.message)
    }
}