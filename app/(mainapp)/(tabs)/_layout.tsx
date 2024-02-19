import React from 'react'
import { Tabs } from 'expo-router'
import { AntDesign, Feather, FontAwesome, Entypo, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { View } from 'react-native';
import COLOR from '@/constants/Colors';

export default function _layout() {
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