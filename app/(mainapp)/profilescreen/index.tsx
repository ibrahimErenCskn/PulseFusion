import { View, Text, Button } from 'react-native'
import React from 'react'
import { useDispatch } from 'react-redux'
import { logaut } from '@/services/redux/reducers/authSlice'


export default function ProfileScreen() {
    const dispatch = useDispatch()
    return (
        <View>
            <Button title='Çıkış Koy' onPress={() => dispatch(logaut())} />
            <Text>ProfileScreen</Text>
        </View>
    )
}