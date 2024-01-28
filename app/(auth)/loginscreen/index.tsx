import { Button, View } from 'react-native'
import React from 'react'
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin'
import auth from '@react-native-firebase/auth';

GoogleSignin.configure({
    webClientId: '360072007112-75plrar7svmvakafk4naun2niojhlaq9.apps.googleusercontent.com',
});
export default function LoginScreen() {
    async function onGoogleButtonPress() {
        await GoogleSignin?.hasPlayServices({ showPlayServicesUpdateDialog: true });
        const { idToken } = await GoogleSignin.signIn();
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
        return auth().signInWithCredential(googleCredential);
    }
    const signInMailAndPass = () => {
        auth()
            .createUserWithEmailAndPassword('jane.doe@example.com', 'SuperSecretPassword!')
            .then(() => {
                console.log('User account created & signed in!');
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    console.log('That email address is already in use!');
                }

                if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                }

                console.error(error);
            });
    }
    return (
        <View>
            <Button
                title="Google Sign-In"
                onPress={() => onGoogleButtonPress().then(() => console.log('Signed in with Google!')).catch(() => console.log('Hata'))}
            />
            <Button
                title="email sign in"
                onPress={() => signInMailAndPass()}
            />
        </View>
    )
}