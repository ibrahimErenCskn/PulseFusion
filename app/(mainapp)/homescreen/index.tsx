import { View, Text, Button } from 'react-native'
import React from 'react'
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin'
import auth from '@react-native-firebase/auth';
import classNames from 'classnames'

GoogleSignin.configure({
    webClientId: '360072007112-75plrar7svmvakafk4naun2niojhlaq9.apps.googleusercontent.com',
});
export default function HomeScreen() {
    const COLOR = true
    const signOut = async () => {
        try {
            await GoogleSignin?.signOut();
            await auth().signOut()
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <View>
            <Button title='Çıkış Koy' onPress={() => signOut()} />
            <Text className={classNames({
                'text-center': true,
                'text-6xl mt-24': COLOR
            })}>Naber</Text>
        </View>
    )
}