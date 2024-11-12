import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import Button from '../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function Akun() {
    const navigation = useNavigation();
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [isLogin, setIsLogin] = useState(false);

    const getToken = async () => {
        try {
            const res = await AsyncStorage.getItem('token');
            console.log(res);
            setToken(res);
        } catch (e) {
            console.log(e);
        }
    }

    const logout = async () => {
        try {
            const res = await AsyncStorage.multiRemove(['token', 'user']);
            setToken(res);
            setIsLogin(false);
            setUser(null);
        } catch (e) {
            console.log(e);
        }
    }

    const getProfile = async () => {
        try {
            const res = await axios('http://192.168.1.24:3000/api/v1/auth/whoami', {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            setUser(res.data.data.user);
            console.log(res.data.data.user);
            setIsLogin(true);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        if (!token) getToken();
    }, []);

    useEffect(() => {
        if (token) {
            setIsLogin(true);
            getProfile();
        }
    }, [token]);

    return (
        <View style={styles.container}>
            {
                !isLogin ?
                    <View style={styles.loginPrompt}>
                        <Image source={require('../assets/images/akun_bg.png')} style={styles.bgImage} />
                        <Text style={styles.promptText}>
                            Upss kamu belum memiliki akun. Mulai buat akun agar transaksi di TMMIN Car Rental lebih mudah.
                        </Text>
                        <Button
                            onPress={() => navigation.navigate('SignUp')}
                            title={'Register'}
                            color={'#5CB85F'}
                        />
                    </View> :
                    <View style={styles.profileSection}>
                        <Image 
                            source={{ uri: user?.avatar ? user.avatar : "https://i.pravatar.cc/100" }} 
                            style={styles.avatar} 
                        />
                        <Text style={styles.greeting}>Halo, {user?.fullname}</Text>
                        <Button
                            onPress={logout}
                            title={'Logout'}
                            color={'#A43333'}
                        />
                    </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: '#f8f8f8',
    },
    loginPrompt: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        textAlign: 'center',
    },
    bgImage: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        marginBottom: 20,
    },
    promptText: {
        fontSize: 19.5,
        color: '#555',
        marginBottom: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        padding: 15
    },
    profileSection: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 16,
    },
    greeting: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 16,
    },
});
