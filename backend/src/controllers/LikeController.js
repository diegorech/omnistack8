const Dev = require('../models/Dev')

module.exports = {
    async store(req, res) {
        //console.log(req.params.devId)//pega o id do URL de quem está logado 
       // console.log(req.headers.user)//pega o id do header do banco

       
       const { user } = req.headers //quem esta logado/"dá o like"
       const { devId } = req.params //quem "recebe o like"
       
       const loggedDev = await Dev.findById( user ) //consigo acessar qualquer info dele do banco de dados/ "loggedDev.avatar"
       const targetDev = await Dev.findById(devId)
       
       console.log(`${loggedDev.name} likes ${targetDev.name}`)
       
       if ( !targetDev ) {  
           return res.status(400).json({ error: "Dev not exists" })
        }
        
        if (targetDev.likes.includes(loggedDev._id)){
            console.log(`${loggedDev.name} e ${targetDev.name} deram MATCH`)
        }
        
        
        loggedDev.likes.push(targetDev._id) //_id como o mongo salva
        
        await loggedDev.save() //para modificar a base de dados
        
        
        return res.json(loggedDev)
    }
}