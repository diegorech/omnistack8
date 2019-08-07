
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')



const routes = require('./routes')
const server = express()//inicia o server

mongoose.connect('mongodb+srv://diego:diego@cluster0-pihyz.mongodb.net/omnistack?retryWrites=true&w=majority', {
    useNewUrlParser: true
})

server.use(cors())
server.use(express.json())
server.use(routes)

server.listen(3333) //porta do localhost 