import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react'
import Button from '../components/Button';
import { useSelector, useDispatch } from 'react-redux';
import { getProfile, selectUser, logout } from '../redux/reducers/user';

export default function Akun() {
    const navigation = useNavigation();
    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!user.data && user.token) {
            dispatch(getProfile(user.token));
        }
    }, [user]);

    return (
        <View style={styles.container}>
            {
                !user.isLogin ? 
                    <View style={styles.loginPrompt}>
                        <Image source={require('../assets/images/akun_bg.png')} style={styles.bgImage} />
                        <Text style={styles.promptText}>Upss kamu belum memiliki akun. Mulai buat akun agar transaksi di TMMIN Car Rental lebih mudah</Text>
                        <Button
                            onPress={() => navigation.navigate('SignUp')}
                            title={'Register'}
                            color={'#5CB85F'}
                            fontSize={10}
                        />
                    </View> :
                    <View style={styles.profileSection}>
                        <Image 
                            source={{ uri: user.data?.avatar ? user.data?.avatar : "https://i.pravatar.cc/100" }} 
                            style={styles.avatar} 
                        />
                        <Text style={styles.greeting}>Halo, {user.data?.fullname}</Text>
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
        padding: 20,
        backgroundColor: '#f8f8f8',
    },
    loginPrompt: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
    bgImage: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        marginBottom: 20,
    },
    promptText: {
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
    },
});
