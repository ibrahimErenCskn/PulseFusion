import { View, Text, Button } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function SplashScreen() {
    return (
        <SafeAreaView>
            <Button title='Login page' onPress={() => router.replace('/(auth)/loginscreen/')} />
        </SafeAreaView>
    )
}