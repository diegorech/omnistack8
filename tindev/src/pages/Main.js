import React, { useState, useEffect} from 'react'
import { Text, View, SafeAreaView, Image, StyleSheet, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

import api from '../services/api'

import logo from '../assets/logo.png'
import like from '../assets/like.png'
import dislike from '../assets/dislike.png'

    export default function Main({ navigation }) {
        const id = navigation.getParam('user')
        const [ users, setUsers ] = useState([])
        
        useEffect(() => {
            async function loadUsers() {
                const response = await api.get('/devs', {
                    headers: {
                        user: id
                    }
                })
                setUsers(response.data)
            }
            
            loadUsers()
        }, [id])

        async function handleLike() {
            const [ user, ...rest ] = users 
                 //pega o primeiro usuário do array e todo o resto armazena em "rest" 
                //rest se torna um array com todos os usúarios menos o que foi dado like e o logado
            await api.post(`/devs/${user._id}/likes`, null, {
                headers: { user: id },
            })

            setUsers(rest)
            //antes: setUser(users.filter(user => user._id !== id))
        }
        
        async function handleDislike() {
            const [ user, ...rest] = users 

            await api.post(`/devs/${user._id}/dislikes`, null, {
                headers: { user: id },
            })

            setUsers(rest)
        }

        async function handleLogout() {
            await AsyncStorage.clear()

            navigation.navigate('Login')
        }

        return(
            
            <SafeAreaView style={styles.container}>
                <TouchableOpacity onPress={handleLogout}>
                    <Image style={styles.logo} source={logo}/>
                </TouchableOpacity>

                <View style={styles.cardsContainer}>
                    { users.length == 0 
                        ? <Text style={styles.empty}>Acabou :(</Text> 
                        : (
                            users.map((user, index) => (
                                <View key={user._id} style={[styles.card, {zIndex: users.length - index }]}>
                                    <Image style={styles.avatar} 
                                    source={ {uri:user.avatar} }
                                    />
                                    <View style={styles.footer}>
                                        <Text style={styles.name}> { user.name } </Text> 
                                        <Text style={ styles.bio} numberOfLines={3}>    {user.bio}
                                        </Text> 
                                    </View>
                                </View>
                            ))
                        ) }
                </View>

                <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.button} onPress={handleDislike}>
                        <Image source={dislike} />
                    </TouchableOpacity> 
                <TouchableOpacity style={styles.button} onPress={handleLike}>
                        <Image source={like} />
                    </TouchableOpacity> 
                </View> 
            </SafeAreaView>
        )
    }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    cardsContainer: {
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'center',
        maxHeight: 500,
    },
    
    card: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        margin: 38,
        overflow:'hidden',//para aplicar o borderRadius em um container
        position: 'absolute',//para ficar um em cima do outro
        //para ocupar todo o espaço do container
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    
    avatar: {
        flex: 1,
        height: 300,
    },
    
    footer: {
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },

    bio: {
        fontSize: 14,
        color: '#999',
        marginTop: 5,
        lineHeight: 18,
    },
    
    logo: {
        marginTop: 60,
    },

    empty: {
        alignSelf: 'center',
        color: '#999',
        fontWeight: 'bold',
        fontSize: 24,
    },

    buttonsContainer: {
        flexDirection: 'row',
        marginBottom: 30,
    },
    
    button: {   
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20,
        
        //sombra no android
        elevation: 2,
        
        //sombra no ios
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 2,
        shadowOffset: {
            width: 0,
            height: 2,
        }
    }
})