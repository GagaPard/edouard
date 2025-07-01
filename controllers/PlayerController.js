const PlayerService = require('./../services/PlayerService')

module.exports.createPlayer = async function(req, res) {
    try {
        let result = await PlayerService.createPlayer(req.body)
        res.send(result)
    }
    catch(err) {
        res.status(405).send(err)
    }
} 

module.exports.getOnePlayer = async function(req, res) {
    try {      
         let result = await PlayerService.getPlayer(req.params.id)
        res.send(result) 
    }
    catch(err) {
        res.status(405).send(err)
    }
}