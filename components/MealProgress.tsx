import { View, Text, DimensionValue } from 'react-native'
import React from 'react'
import WidgetContainer from './WidgetContainer'
import ProgressBar from './ProgressBar'

interface MealProgressProps {
    progress: number
    typeText: string
    value: number
    valueText: string
}

export default function MealProgress({ progress, typeText, value, valueText }: MealProgressProps) {
    return (
        <WidgetContainer setHeight={64} customStyle={{ borderRadius: 20 }}>
            <View style={{ justifyContent: 'space-evenly', height: '100%' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15 }}>
                    <Text style={{ fontWeight: '700' }}>{typeText}</Text>
                    <Text style={{ color: 'white' }}>{value} {valueText}</Text>
                </View>
                <ProgressBar progress={((progress / value) * 100).toFixed(1)} />
            </View>
        </WidgetContainer>
    )
}