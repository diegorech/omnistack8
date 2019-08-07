import React, { useState } from 'react'
import './Login.css'

import api from "../services/api"

import logo from '../assets/logo.svg'


export default function Login ({ history }) {
    const [username, setUsername] = useState('')
    
    async function handleSubmit(e) {
        e.preventDefault()


        //Pega as infos da api do node com o username
        const response = await api.post('/devs', {
            username,
        })


        const { _id } = response.data
    
    
    
        // Rota para qual o usuario será enviado
        history.push(`/dev/${_id}`)
    }


    return (

        <div className='login-container'>
            <form onSubmit={handleSubmit}>
                <img src={logo} alt='Tindev logo' />
                <input 
                    placeholder='Digite seu usuário no github'
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    />
                <button type='submit'> Enviar </button>
            </form>
        </div>
    
    )
}

 