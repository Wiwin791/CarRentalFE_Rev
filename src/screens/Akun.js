import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react'
import Button from '../components/Button';
import { useSelector, useDispatch } from 'react-redux';
import { getProfile, selectUser, logout } from '../redux/reducers/user';

export default function Akun() {
    const navigation = useNavigation();
<<<<<<< HEAD
    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!user.data && user.token) {
            dispatch(getProfile(user.token));
        }
    }, [user]);
=======
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
>>>>>>> d18b6d755eae2cc70838571d4a737c681a27ef41

    return (
        <View style={styles.container}>
            {
<<<<<<< HEAD
                !user.isLogin ? 
                    <View style={styles.loginPrompt}>
                        <Image source={require('../assets/images/akun_bg.png')} style={styles.bgImage} />
                        <Text style={styles.promptText}>Upss kamu belum memiliki akun. Mulai buat akun agar transaksi di TMMIN Car Rental lebih mudah</Text>
=======
                !isLogin ?
                    <View style={styles.loginPrompt}>
                        <Image source={require('../assets/images/akun_bg.png')} style={styles.bgImage} />
                        <Text style={styles.promptText}>
                            Upss kamu belum memiliki akun. Mulai buat akun agar transaksi di TMMIN Car Rental lebih mudah.
                        </Text>
>>>>>>> d18b6d755eae2cc70838571d4a737c681a27ef41
                        <Button
                            onPress={() => navigation.navigate('SignUp')}
                            title={'Register'}
                            color={'#5CB85F'}
                            fontSize={10}
                        />
                    </View> :
                    <View style={styles.profileSection}>
                        <Image 
<<<<<<< HEAD
                            source={{ uri: user.data?.avatar ? user.data?.avatar : "https://i.pravatar.cc/100" }} 
                            style={styles.avatar} 
                        />
                        <Text style={styles.greeting}>Halo, {user.data?.fullname}</Text>
=======
                            source={{ uri: user?.avatar ? user.avatar : "https://i.pravatar.cc/100" }} 
                            style={styles.avatar} 
                        />
                        <Text style={styles.greeting}>Halo, {user?.fullname}</Text>
>>>>>>> d18b6d755eae2cc70838571d4a737c681a27ef41
                        <Button
                            onPress={() => dispatch(logout())}
                            title={'Logout'}
                            color={'#A43333'}
                            buttonStyle={styles.logoutButton} 
                        />
                    </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
<<<<<<< HEAD
        padding: 20,
        backgroundColor: '#f8f8f8',
    },
    loginPrompt: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
=======
        padding: 15,
        backgroundColor: '#f8f8f8',
    },
    loginPrompt: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
>>>>>>> d18b6d755eae2cc70838571d4a737c681a27ef41
        textAlign: 'center',
    },
    bgImage: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        marginBottom: 20,
    },
    promptText: {
<<<<<<< HEAD
        fontSize: 18,
        color: '#555',
        marginBottom: 20,
        textAlign: 'center',
        fontWeight: '700',
        paddingHorizontal: 20,
    },
    profileSection: {
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        padding: 20, 
        backgroundColor: '#fff', 
        borderRadius: 10, 
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 2 }, 
        shadowOpacity: 0.1, 
        shadowRadius: 4, 
        elevation: 4, 
        marginVertical: 20,
        textAlign: 'center',
    },
    avatar: {
        width: 100, 
        height: 100, 
        borderRadius: 50, 
        borderWidth: 2, 
        borderColor: '#fff', 
        marginBottom: 15,
    },
    greeting: {
        fontSize: 22, 
        fontWeight: '600', 
        color: '#333', 
        marginBottom: 20,
    },
    logoutButton: {
        backgroundColor: '#A43333',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        width: '80%',
        alignSelf: 'center',
=======
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
>>>>>>> d18b6d755eae2cc70838571d4a737c681a27ef41
    },
});
