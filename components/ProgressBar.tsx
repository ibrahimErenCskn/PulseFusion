import { Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import LinearGradient from 'react-native-linear-gradient'

interface ProgressBarProps {
    progress?: any;
}

export default function ProgressBar({ progress = 50 }: ProgressBarProps) {
    const [convert, setConvert] = useState<any>()
    useEffect(() => {
        setConvert(progress)
        if (progress >= 100) {
            setConvert('100%')
        } else {
            setConvert(progress.toString() + '%')
        }
    }, [progress])
    return (
        <View style={{ width: '90%', backgroundColor: 'white', borderRadius: 20, alignSelf: 'center' }}>
            <LinearGradient colors={['#C58BF2', '#92A3FD']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ width: convert, height: 20, borderRadius: 20, paddingRight: 10, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold', alignSelf: 'flex-end' }}>{progress?.toString()}%</Text>
            </LinearGradient>
        </View>
    )
}