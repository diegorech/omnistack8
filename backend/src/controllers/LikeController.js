const Dev = require('../models/Dev')

module.exports = {
    async store(req, res) {
        console.log(req.params.devId)
        console.log(req.headers.user)

        const { user } = req.headers //quem esta logado/"dá o like"
        const { devId } = req.params //quem "recebe o like"

        const loggedDev = await Dev.findById( user ) //consigo acessar qualquer info dele do banco de dados/ "loggedDev.avatar"
        const targetDev = await Dev.findById(devId)

        if ( !targetDev ) {  
            return res.status(400).json({ error: "Dev not exists" })
        }

        if (targetDev.likes.includes(loggedDev._id)){
            console.log('DEU MATCH')
        }


        loggedDev.likes.push(targetDev._id) //_id como o mongo salva

        await loggedDev.save() //para modificar a base de dados

        return res.json(loggedDev)
    }
}