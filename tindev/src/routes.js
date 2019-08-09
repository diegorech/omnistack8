
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
//createAppContainer deve estar por volta de toda navegação da aplicação
//createSwitchNavigator cria uma navegação entre 2 telas sem nenhum feedback visual

import Login from './pages/Login'
import Main from './pages/Main'

export default createAppContainer(
    createSwitchNavigator({
        Login,
        Main,
    })
)