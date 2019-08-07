import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
//auxilia na criação de rotas

import Login from './pages/Login'
import Main from './pages/Main'


export default function Routes() {
    return(
        <BrowserRouter>
             {/*Exact para comparar com exatidão, senão ele só iria para o '/'  */}
            <Route path='/' exact component={Login} />
            <Route path='/dev/:id' component ={Main} />
        </BrowserRouter>
    )
}