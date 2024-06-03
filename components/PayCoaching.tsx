import { View, ScrollView } from 'react-native'
import React from 'react'

interface PayCoachingProps {
    children: React.ReactNode
}

export default function PayCoaching({ children }: PayCoachingProps) {
    return (
        <View style={{ width: '100%', height: '96%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
            <ScrollView style={{ width: '100%', height: '100%' }}>
                {children}
            </ScrollView>
        </View>
    )
}