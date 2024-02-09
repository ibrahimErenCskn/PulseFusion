import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { router } from 'expo-router'
import auth from '@react-native-firebase/auth'
import LottieAnim from '@/services/lottie/LottieAnim'
import { useDispatch } from 'react-redux'
import { setData } from '@/services/redux/reducers/authSlice'

export default function AuthCheck() {
    const dispatch = useDispatch()
    useEffect(() => {
        auth().onAuthStateChanged(async (user) => {
            if (user) {
                dispatch(setData(user))
                router.replace('/(mainapp)/homescreen/')
            } if (!user) {
                router.replace('/(auth)/splashscreen/')
            }
        });
    }, [])

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <LottieAnim />
        </View>
    )
}