//controllers - responsável pela lógica da aplicação, ela recebe as requisições e formula a resposta

//DevControllers - fica responsável por: Criação, alteração, detele, listagem, etc. dos Devs

const axios = require('axios')

const Dev = require('../models/Dev')

module.exports = {
    async index(req, res) {

        const { user } = req.headers

        const loggedDev = await Dev.findById(user) //pega a instância do usuário logado (todos os dados)


        // Exclui da listagem tds os users que estão na lista de likes, dislikes ou que seja o próprio user logado
        const users = await Dev.find({
            $and: [ // aplica o && nos 3 filtros
                { _id: { $ne: user } }, //$ne - "not equal" = desigualdade
                { _id: { $nin: loggedDev.likes} }, //$nin - "not in"
                { _id: { $nin: loggedDev.dislikes} },
            ],
        })

        return res.json(users)
    },

    async store(req, res) {
        
        const { username } = req.body

        //checar se usuário ja existe
        const userExists = await Dev.findOne({ user: username })

        if (userExists) {
            return res.json(userExists)
        }
        
        
        const response = await axios.get(`https://api.github.com/users/${username}`)
        //axios.get é assíncrono

        //console.log(response.data) 
        //.data é onde o axios armazena os dados
        
        const { name, bio, avatar_url: avatar} = response.data

        const dev = await Dev.create({ 
            name,
            user: username,
            bio,
            avatar
            
            //vai retirar as infos da api do github e inserir no model Dev
        })
        console.log(`Usúario ${dev.name} criado com sucesso`)
        return res.json(dev)
    }
}