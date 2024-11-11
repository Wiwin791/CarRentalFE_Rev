import { KeyboardAvoidingView, View, Text, Image, TextInput, StyleSheet, ScrollView } from 'react-native'
import React, { useEffect, useReducer, useState } from 'react'
import Button from '../components/Button'
import { Link, useNavigation } from '@react-navigation/native'
import ModalPopup from '../components/Modal'
import Icon from 'react-native-vector-icons/Feather';
import axios from 'axios'

const initialFormState = {
    email: '',
    password: '',
}

export default function SignIn() {
    const navigation = useNavigation();
    const [formData, setFormData] = useReducer((state, event) => {
        return {
            ...state,
            [event.name]: event.value,
        };
    }, initialFormState)
    const [modalVisible, setModalVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);


    const handleChange = (val, name) => {
        setFormData({
            name: name,
            value: val,
        });
    }

    const handleSubmit = async () => {
        try {
            const res = await axios.post("http://192.168.100.2:3000/api/v1/auth/signin",
                JSON.stringify(formData), {
                headers: {
                    "Content-Type": 'application/json'
                }
            }
            )
            console.log(res)
            setModalVisible(true)
            setErrorMessage(null)
        } catch (e) {
            setModalVisible(true)
            setErrorMessage(e.response.data.message)
            console.log(e.response)
        }
    }

    useEffect(() => {
        return () => {
            setTimeout(() => {
                if(errorMessage === null) navigation.navigate('Home')
                setModalVisible(false)
                setFormData(initialFormState)
                setErrorMessage(null)
            }, 1000)
        }
    }, [modalVisible])

    return (
        <ScrollView>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : undefined}
                style={styles.authWrapper}>
                <View style={{ flex: 1 }}>
                    <Image source={require('../assets/images/logo_tmmin.png')} />
                    <Text style={styles.authTitle}>Welcome Back!</Text>
                    <View>
                        <View style={styles.inputWrapper}>
                            <Text style={styles.inputLabel}>Email</Text>
                            <TextInput style={styles.input} placeholder='Contoh: johndee@gmail.com' onChangeText={(text) => handleChange(text, 'email')} />
                        </View>
                        <View style={styles.inputWrapper}>
                            <Text style={styles.inputLabel}>Password</Text>
                            <TextInput style={styles.input} secureTextEntry={true}
                                placeholder='6+ Karakter' onChangeText={(text) => handleChange(text, 'password')} />
                        </View>
                        <Button
                            onPress={handleSubmit}
                            title={'Sign In'}
                            color={'#5CB85F'}
                        />
                    </View>
                    <View>
                        <Text style={styles.authFooterText}>Don’t have an account? <Link screen="Sign Up">Sign Up for free</Link></Text>
                    </View>
                    <ModalPopup visible={modalVisible}>
                        <View style={styles.modalBackground}>
                            {errorMessage !== null ?
                                <>
                                    <Icon size={32} name={'x-circle'} />
                                    <Text>{errorMessage}</Text>
                                </>
                                :
                                <>
                                    <Icon size={32} name={'check-circle'} />
                                    <Text>Berhasil Login!</Text>
                                </>
                            }
                        </View>
                    </ModalPopup>
                </View>
            </KeyboardAvoidingView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    authWrapper: {
        flex: 1,
        padding: 20
    },
    authTitle: {
        fontSize: 32,
        fontWeight: 700,
        textAlign: 'center',
        marginVertical: 20
    },
    inputWrapper: {
        marginBottom: 20
    },
    inputLabel: {
        fontWeight: 700,
    },
    input: {
        borderWidth: 1,
        marginTop: 10,
        paddingHorizontal: 10,
    },
    authFooterText: {
        marginTop: 10,
        fontWeight: 500,
        textAlign: "center"
    },
    modalBackground: {
        width: '90%',
        backgroundColor: '#fff',
        elevation: 20,
        borderRadius: 4,
        padding: 20
    }
})