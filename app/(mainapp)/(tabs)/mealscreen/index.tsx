import { Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import { getUserData } from '@/services/redux/reducers/firestore'

export default function MealScreen() {
    const dispatch = useDispatch()
    const { mealData, isLoading } = useSelector((state: any) => state.userData)
    const getData = async () => {
        await dispatch(getUserData({ userDataName: 'naber' }))
    }
    useEffect(() => {
        getData()
        console.log(isLoading)
        console.log(mealData)
    }, [])

    if (!mealData || isLoading) {
        return (
            <SafeAreaView>
                <Text>Data Yok</Text>
            </SafeAreaView>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, paddingHorizontal: 10, paddingVertical: 12 }}>
            <Text>MealScreen</Text>
        </SafeAreaView>
    )
}