import { DimensionValue, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'

interface ProgressBarProps {
    progress?: DimensionValue;
}

export default function ProgressBar({ progress = '50%' }: ProgressBarProps) {
    return (
        <View style={{ width: '90%', backgroundColor: 'white', borderRadius: 15, alignSelf: 'center' }}>
            <LinearGradient colors={['#C58BF2', '#92A3FD']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ width: progress === '100%' ? '100%' : progress, height: 15, borderRadius: 15 }}>

            </LinearGradient>
        </View>
    )
}