import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { router } from 'expo-router'
import auth from '@react-native-firebase/auth'

export default function AuthCheck() {
    useEffect(() => {
        auth().onAuthStateChanged(async (user) => {
            if (user) {
                router.replace('/(mainapp)/homescreen/')
            } if (!user) {
                router.replace('/(auth)/splashscreen/')
            }
        });
    }, [])

    return (
        <View>
            <Text>Giriş Yapılıyor</Text>
        </View>
    )
}