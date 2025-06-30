const express = require('express')
const app = express()   //Créé l'appli, méthode de express
const mongoose = require('mongoose')


main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');
}

app.use(express.json()) //Pour utiliser que du json


const players = [
    {name : 'Edouard', score : 10}
]

let schemas = {
    name : "String",
    score : "Number"
}

app.get('/ping', (req, res) => {    //Crée une route HTTP GET accessible à l’URL /ping
    res.json({reponse: 'pong'})
})

app.get('/players', (req, res) => {
    res.json(players)  
})

app.post('/player', (req, res) => {     //Crée une route HTTP POST accessible à l’URL /player
    let player_to_add = req.body
    players.push(player_to_add)
    res.json(player_to_add)
})

app.post('/players', (req, res) => {
    let players_to_add = req.body
    let result = checkPlayerProfTab(players_to_add)
    if (result.success === true) {
        players.push(players_to_add)
        res.json(players_to_add)
    } else {
        res.status(405).send(result.errors)
    }
})

let checkPlayerProfTab = function (tab) {
    //On créé un tableau repertoriant toutes les erreurs
    let errors = []
    //On vérifie que les objets sont bien contenus dans un tableau
    if (Array.isArray(tab)) {
        for (let j = 0; j < tab.length; j++) {
            //On créé une variable obj qui sera l'index de notre tableau (j'ai la flemme d'écrire tab[j] à la fin et c'est confusant)
            let obj = tab[j]
            //On créé une variable qui contient les clés de notre objet
            let keys = Object.keys(obj)
            //On vérifie que l'objet existe, que c'est un objet et pas un tableau et qu'il y a autant de clés que dans le schéma
            if (
                obj
                && typeof obj === 'object'
                && !Array.isArray(obj)
                && keys.length == Object.keys(schemas).length
            ) {
                //On se balade dans nos keys
                for (let i = 0; i < keys.length; i++) {
                    //Pareil que pour obj, c'est plus clair comme ça et flemme de réécrire
                    let key = keys[i]
                    //On créé une variable qui contient les clés de notre schéma
                    let keys_authorized = Object.keys(schemas)
                    //On utlise indexof pour vérifier que les clés autorisés sont présentes dans les clés de notre objet. Rappel : indexOf() renvoie le premier indice pour lequel on trouve un élément donné dans un tableau, et retourne -1 si il ne le trouve pas
                    if (keys_authorized.indexOf(key) > -1) {
                        //On vérifie par la suite que le type de la valeur de la clé est bien celui approprié. On utilise "toLowerCase" car dans notre schéma, on a mis une majuscule, mais typeof retourne toujours des minuscules
                        if (typeof obj[key] === schemas[key].toLowerCase()) {
                            console.log(key, "type respecté")
                        } else {
                            console.log(key, "type pas respecté")
                            errors.push({
                                key: key,
                                message: `N'a pas le type attendu. Type actuel : (${typeof obj[key]}) -> Type attendu : (${schemas[key].toLowerCase()})`
                            })
                        }
                    } else {
                        errors.push({
                            key: key,
                            message: `La clé "${key}" n'est pas autorisée.`
                        })
                    }
                }
            } else {
                return {
                    success: false,
                    errors: [{ key: '*', message: 'Objet non conforme.' }]
                }
            }
        }
    } else {
        return {
            success: false,
            errors: [{ message: 'Non déclaré dans un tableau.' }]
        }
    }

   return {success : errors.length > 0 ? false : true, errors: errors}
    //C'est comme si on disait :
    //if (errors.length === 0) 
    //  return {success: true, errors: []}
    //else 
    //  return {success: false, errors}
}

app.listen(3000)    //Affecte le port 3000 à notre serveur, on y accède en faisant localhost:3000 sur le navigateur

let checkPlayerGael = function(player) {
    return (
        //On vérifie que c'est bien un objet
        typeof player === "object"
        // qu'il y a bien quelque chose dedans
        && player != null 
        //que name existe et que sa value est une chaîne de caractères
        && typeof player.name === "string"
        //que score existe et que sa value est un nombre
        && typeof player.score === "number"
        //qu'il y a bien que deux clés
        && players.keys === 2)
}

// Le app.post qui marchait avec mon check player

// app.post('/players', (req, res) => {
//     let players_to_add = req.body
//     //On vérifie que c'est bien mis dans un tableau
//     if (!Array.isArray(players_to_add)) {
//         return res.json({error: "Les joueurs doivent être contenus dans un tableau"})
//     }

//     //On filtre chacun des éléments de players_to_add avec notre fonction qui checke si c'est bien écrit et on le fout dans une variable tableau
//     const invalidPlayers = players_to_add.filter(player => !checkPlayer(player))

//     //Si le tableau des invalides n'est pas vide, on retourne une erreur ainsi que le tableau en entier qui contient les erreurs
//     if (invalidPlayers.length > 0) {
//         return res.json({error: "Les joueurs doivent être en format : {name : 'name', score : number}", invalids: invalidPlayers})
//     }

//     //Si le tableau des invalides est vide on fait comme avant
//     players_to_add.forEach(player => players.push(player))
//     res.json(players_to_add)
// })