import { View, Text, Button } from 'react-native'
import React from 'react'
import { useDispatch } from 'react-redux'
import { logaut } from '@/redux/reducers/authSlice'

export default function HomeScreen() {
    const dispatch = useDispatch()
    return (
        <View>
            <Button title='Çıkış Koy' onPress={() => dispatch(logaut())} />
            <Text>Naber</Text>
        </View>
    )
}