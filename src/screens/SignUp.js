import { KeyboardAvoidingView, View, Text, Image, TextInput, StyleSheet, ScrollView } from 'react-native'
import React, { useEffect, useCallback, useState, } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../components/Button'
import { Link, useNavigation, useFocusEffect } from '@react-navigation/native'
import ModalPopup from '../components/Modal'
import Icon from 'react-native-vector-icons/Feather';
import { postRegister, resetState, selectUser } from '../redux/reducers/user';
import GoogleButton from '../components/GoogleButton';

const initialFormState = {
    fullname: '',
    email: '',
    password: '',
}

export default function SignUp() {
    const dispatch = useDispatch()
    const navigation = useNavigation();
    const [formData, setFormData] = useState(initialFormState);
    const [modalVisible, setModalVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const user = useSelector(selectUser);


    const handleChange = (val, name) => {
        setFormData({
          ...formData,
          [name]: val,
        });
      };

    const handleSubmit = async () => {
        await dispatch(postRegister(formData));
      };

      useFocusEffect(
        useCallback(() => {
          if (user.status === 'success') {
            setModalVisible(true);
            setErrorMessage(null);
            setTimeout(() => {
              setModalVisible(false);
              navigation.navigate('HomeTabs', { screen: 'SignIn'}); // Navigate after successful registration
            }, 1000);
          } else if (user.status === 'failed') {
            setModalVisible(true);
            dispatch(resetState())
            setErrorMessage(user.message)
            setTimeout(() => {
              setModalVisible(false);
            }, 2000)
          } 
          console.log(user.status)
          console.log(modalVisible)
        }, [user])
      );

    useEffect(() => {
        dispatch(resetState())
    },[])

    return (
        <ScrollView>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : undefined}
                style={styles.authWrapper}>
                <View style={{ flex: 1 }}>
                    <Image source={require('../assets/images/logo_tmmin.png')} />
                    <Text style={styles.authTitle}>Sign Up</Text>
                    <View>
                        <View style={styles.inputWrapper}>
                            <Text style={styles.inputLabel}>Name</Text>
                            <TextInput style={styles.input} placeholder='Full Name' onChangeText={(text) => handleChange(text, 'fullname')} />
                        </View>
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
                            title={'Sign Up'}
                            color={'#5CB85F'}
                        />
                    </View>

                    <View style={styles.separatorContainer}>
                        <Text style={styles.orText}>OR</Text>
                    </View>

                    <GoogleButton style={styles.googleButton} />
                    <View>
                        <Text style={styles.authFooterText}>Already have an account? <Link screen="SignIn">Sign In here</Link></Text>
                    </View>

                    <ModalPopup visible={modalVisible}>
                        <View style={styles.modalBackground}>
                            {errorMessage !== null ? 
                                <>
                                    <Icon size={32} name={'x-circle'} color="#D9534F" style={styles.iconError} />
                                    {Array.isArray(errorMessage) ? 
                                        errorMessage.map((e, index) => {
                                            return <Text key={index}>{e.message} </Text>
                                        })
                                    :
                                        <Text style={styles.errorMessage}>{errorMessage}</Text>
                                    }
                                </>
                                :
                                <>
                                    <Icon size={32} name={'check-circle'} color="#5CB85F" style={styles.iconSuccess} />
                                    <Text>Berhasil Register!</Text>
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
        fontWeight: '700',
        textAlign: 'center',
        marginVertical: 20
    },
    inputWrapper: {
        marginBottom: 20
    },
    inputLabel: {
        fontWeight: '700',
    },
    input: {
        borderWidth: 1,
        marginTop: 10,
        paddingHorizontal: 10,
    },
    authFooterText: {
        marginTop: 10,
        fontWeight: '500',
        textAlign: "center"
    },
    modalBackground: {
        width: '90%',
        backgroundColor: '#fff',
        elevation: 20,
        borderRadius: 10,
        padding: 30,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    iconError: {
        marginBottom: 15,
    },
    iconSuccess: {
        marginBottom: 15,
    },
    errorMessage: {
        fontSize: 16,
        color: '#D9534F',
        fontWeight: '500',
        textAlign: 'center',
        marginTop: 10,
    },
    googleButton: {
        marginTop: 20,
        alignItems : 'center'
    },
    separatorContainer: {
        marginVertical: 20,
        alignItems: 'center',
    },
    orText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#888',
    },
})
