import React, { useEffect, useState } from 'react'
import { Tabs } from 'expo-router'
import { AntDesign, Feather, FontAwesome, Entypo, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { View } from 'react-native';
import COLOR from '@/constants/Colors';
import { addListenerData } from '@/services/utils/dataListener';
import { useDispatch, useSelector } from 'react-redux';
import { addMealData, dayCaloriesCalculate, setActivityData, setBmi, setUserInfo } from '@/services/redux/reducers/dataSlice';

export default function _layout() {
    const dispatch = useDispatch()
    const { userData } = useSelector((state: any) => state.allData)

    const [firstMealData, setFirstMealData] = useState<any>()
    const [userData_, setUserData] = useState<any>()
    const [activityData, setActivityData_] = useState<any>()

    useEffect(() => {
        addListenerData({ setData: setUserData, dataName: 'userData' })
        return () => {
            setUserData(null)
        }
    }, [])
    useEffect(() => {
        addListenerData({ setData: setFirstMealData, dataName: 'mealData' })
        return () => {
            setFirstMealData(null)
        }
    }, [])
    useEffect(() => {
        addListenerData({ setData: setActivityData_, dataName: 'activityData' })
        return () => {
            setActivityData_(null)
        }
    }, [])
    useEffect(() => {
        if (userData_) {
            dispatch(setBmi(userData_))
            dispatch(setUserInfo(userData_))
        }
    }, [userData_])

    useEffect(() => {
        if (firstMealData) {
            dispatch(addMealData(firstMealData))
            dispatch(dayCaloriesCalculate(userData_))
        }
    }, [firstMealData])

    useEffect(() => {
        if (activityData) {
            dispatch(setActivityData(activityData))
        }
    }, [activityData])

    return (
        <Tabs initialRouteName='homescreen/index' screenOptions={{ headerShown: false, tabBarStyle: { backgroundColor: COLOR.authColor }, tabBarShowLabel: false, tabBarActiveTintColor: 'black', tabBarInactiveTintColor: 'black', headerShadowVisible: false }}>
            <Tabs.Screen name='homescreen/index' options={{
                tabBarIcon: ({ color, focused }) => (
                    <View style={focused && { alignItems: 'center', justifyContent: 'center', backgroundColor: COLOR.authColor, height: 65, width: 65, borderRadius: 32.5, marginBottom: 30 }}>
                        <AntDesign name="home" size={26} color={color} />
                        {focused &&
                            <View>
                                <Entypo name="dot-single" size={18} color="black" />
                            </View>
                        }
                    </View>
                ),
            }} />
            <Tabs.Screen name='activityscreen/index' options={{
                tabBarIcon: ({ color, focused }) => (
                    <View style={focused && { alignItems: 'center', justifyContent: 'center', backgroundColor: COLOR.authColor, height: 65, width: 65, borderRadius: 32.5, marginBottom: 30 }}>
                        <Feather name="activity" size={26} color={color} />
                        {focused &&
                            <Entypo name="dot-single" size={18} color="black" />
                        }
                    </View>
                )
            }} />
            <Tabs.Screen name='coachingscreen/index' options={{
                tabBarIcon: ({ color, focused }) => (
                    <View style={focused && { alignItems: 'center', justifyContent: 'center', backgroundColor: COLOR.authColor, height: 65, width: 65, borderRadius: 32.5, marginBottom: 30 }}>
                        <MaterialIcons name="fitness-center" size={26} color={color} />
                        {focused &&
                            <Entypo name="dot-single" size={18} color="black" />
                        }
                    </View>
                )
            }}
            />
            <Tabs.Screen name='mealscreen/index' options={{
                tabBarIcon: ({ color, focused }) => (
                    <View style={focused && { alignItems: 'center', justifyContent: 'center', backgroundColor: COLOR.authColor, height: 65, width: 65, borderRadius: 32.5, marginBottom: 30 }}>
                        <Ionicons name="fast-food-outline" size={26} color={color} />
                        {focused &&
                            <Entypo name="dot-single" size={18} color="black" />
                        }
                    </View>
                ),
            }} />
            <Tabs.Screen name='profilescreen/index' options={{
                tabBarIcon: ({ color, focused }) => (
                    <View style={focused && { alignItems: 'center', justifyContent: 'center', backgroundColor: COLOR.authColor, height: 65, width: 65, borderRadius: 32.5, marginBottom: 30 }}>
                        <FontAwesome name="user-o" size={26} color={color} />
                        {focused &&
                            <Entypo name="dot-single" size={18} color="black" />
                        }
                    </View>
                )
            }} />
        </Tabs>
    )
}