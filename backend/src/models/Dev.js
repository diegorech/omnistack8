const { Schema, model } = require('mongoose')

const DevSchema = new Schema({ //Schema vai montar qual a estrutura do meu BD pra armazenar um DEv dentro
    name: {
        type: String,
        required: true,
    },
    user: {
        type: String,
        required: true,
    },
    bio: String,
    avatar: {
        type: String, //vai receber o endereço do avatar da api do github
        required: true
    },
    likes: [{
        type: Schema.Types.ObjectId, //formato do ID do mongoDB
        ref: 'Dev',
    }],
    dislikes: [{
        type: Schema.Types.ObjectId,  
        ref: 'Dev',
    }],
},
{
    timestamps: true,//cria no BD o createAt e o updatedAt
}) 

module.exports = model('Dev', DevSchema) //model importado do mongoose recebe 2 parâmetros que é o nome do model e o schema