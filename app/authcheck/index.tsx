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
                const mealCheck = await dispatch(checkUserData({ uid: user.uid, userDataName: "mealData" }))
                const activityCheck = await dispatch(checkUserData({ uid: user.uid, userDataName: "activityData" }))
                if (!userCheck.payload) {
                    router.replace('/setProfile/')
                }
                else if (!mealCheck.payload) {
                    router.replace('/setmeal/')
                }
                else if (!activityCheck.payload) {
                    router.replace('/setactivity/')
                }
                else {
                    router.replace('/(mainapp)/(tabs)/homescreen/')
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