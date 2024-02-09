import React from 'react'
import { Tabs } from 'expo-router'

export default function _layout() {
    return (
        <Tabs screenOptions={{ headerShown: false }}>
            <Tabs.Screen name='homescreen/index' />
            <Tabs.Screen name='activityscreen/index' />
            <Tabs.Screen name='coachingscreen/index' />
            <Tabs.Screen name='mealscreen/index' />
            <Tabs.Screen name='profilescreen/index' />
        </Tabs>
    )
}