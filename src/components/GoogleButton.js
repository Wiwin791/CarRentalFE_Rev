import { View } from 'react-native';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import {GOOGLE_WEB_CLIENT_ID} from '@env';
import {  useDispatch } from 'react-redux';
import { GoogleLogin} from '../redux/reducers/user';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

GoogleSignin.configure({
    webClientId: GOOGLE_WEB_CLIENT_ID,
    scopes: [
        'https://www.googleapis.com/auth/user.addresses.read',
        'https://www.googleapis.com/auth/user.gender.read',
        'https://www.googleapis.com/auth/drive'
    ],
    offlineAccess: true,
});

export default function GoogleButton() {
    const dispatch = useDispatch();

    async function onGoogleButtonPress() {
        // Check if your device supports Google Play
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        // Get the users ID token
        const signInResult = await GoogleSignin.signIn();
        console.log(signInResult)
        // Try the new style of google-sign in result, from v13+ of that module
        let idToken = signInResult.data?.idToken;
        if (!idToken) {
            // if you are using older versions of google-signin, try old style result
            idToken = signInResult.idToken;
        }
        if (!idToken) {
            throw new Error('No ID token found');
        }

        dispatch(GoogleLogin({idToken}))
    }

    useFocusEffect(
        useCallback(() => {
            GoogleSignin.revokeAccess()
    },[]))

    return (
        <View>
            <GoogleSigninButton
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={onGoogleButtonPress}
                // disabled={isInProgress}
            />
        </View>
    )
}