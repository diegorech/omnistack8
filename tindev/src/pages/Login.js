import React, { useState, useEffect } from 'react'
//import { AsyncStorage } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { Text, View, KeyboardAvoidingView, Platform, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native'

import api from '../services/api'

import logo from '../assets/logo.png'


export default function Login({ navigation }) {
    const [user, setUser] = useState('')

    useEffect(() => {
        AsyncStorage.getItem('user').then(user => {
            if (user) {
                navigation.navigate('Main', { user })
            }
        })
    }, [])//como quero q o usuário permaneca logado ao atualizar a pag deixo o caminho para onde iria em branco
    
    async function handleLogin() {
        const response = await api.post('/devs', { username: user })

        const { _id } = response.data

        await AsyncStorage.setItem('user', _id)
        
        navigation.navigate('Main', { user: _id })
    }
    
    
    return(

        <KeyboardAvoidingView //para o teclado n cubrir o conteúdo
            behavior="padding"//o conteúdo sobe ao abrir o teclado
            enabled={Platform.OS == 'ios'}//devolve qual o sistema do usuário
            style={styles.container}
        > 
            <Image source={logo}/>

            <TextInput
                autoCapitalize='none'
                autoCorrect={false} 
                style={styles.input}
                placeholder='Digite seu usuário no Github'
                placeholderTextColor='#999'
                value={user}
                onChangeText={setUser}
            />

            <TouchableOpacity onPress={handleLogin} style={styles.button}>
                <Text style={styles.buttonText}>Enviar</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>

        
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30
    },
    input: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
        marginTop: 20,
        paddingHorizontal: 15,
        
    },
    button: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#DF4723',
        borderTopStartRadius: 4,
        marginTop: 10,
        justifyContent: 'center',
        alignItems:'center',

    },
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
})