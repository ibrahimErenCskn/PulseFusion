import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { router } from 'expo-router'
import auth from '@react-native-firebase/auth'
import LottieAnim from '@/services/lottie/LottieAnim'
import { useDispatch } from 'react-redux'
import { setData } from '@/services/redux/reducers/authSlice'
import { checkUserData } from '@/services/redux/reducers/firestore'

export default function AuthCheck() {
    const dispatch = useDispatch()
    useEffect(() => {
        auth().onAuthStateChanged(async (user) => {
            if (user) {
                dispatch(setData(user))
                const userCheck = await dispatch(checkUserData({ uid: user.uid, userDataName: "userData" }))
                if (userCheck.payload) {
                    router.replace('/(mainapp)/(tabs)/homescreen/')
                } else {
                    router.replace('/setProfile/')
                }
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