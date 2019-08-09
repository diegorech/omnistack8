const Dev = require('../models/Dev')

module.exports = {
    async store(req, res) {
        //console.log(req.params.devId)//pega o id do URL de quem está logado 
        // console.log(req.headers.user)//pega o id do header do banco
        //console.log(req.io, req.connectedUsers)
       
       const { user } = req.headers //quem esta logado/"dá o like"
       const { devId } = req.params //quem "recebe o like"
       
       const loggedDev = await Dev.findById( user ) //consigo acessar qualquer info dele do banco de dados/ "loggedDev.avatar"
       const targetDev = await Dev.findById(devId)
       
       console.log(`${loggedDev.name} likes ${targetDev.name}`)
       
       if ( !targetDev ) {  
           return res.status(400).json({ error: "Dev not exists" })
        }
        

        //funcionalidade do match em tempo real com websocket
        if (targetDev.likes.includes(loggedDev._id)){
            console.log(`${loggedDev.name} e ${targetDev.name} deram MATCH`)

            const loggedSocket = req.connectedUsers[user]
            const targetSocket = req.connectedUsers[devId]

            if ( loggedDev ) {
                req.io.to(loggedSocket).emit('match', targetDev)
            }

            if ( targetDev ) {
                req.io.to(targetSocket).emit('match', loggedDev)
            }
        }
        
        
        loggedDev.likes.push(targetDev._id) //_id como o mongo salva
        
        await loggedDev.save() //para modificar a base de dados
        
        
        return res.json(loggedDev)
    }
}