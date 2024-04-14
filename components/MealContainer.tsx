import { View, Text, FlatList, Image, Pressable, StyleSheet, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Ionicons } from '@expo/vector-icons'
import { deleteUserData, writeDataInUsers } from '@/services/redux/reducers/firestore'
import Checkbox from 'expo-checkbox';
import CustomCheckBox from './CustomCheckBox'

interface MealContainerProps {
    name: string
}

export default function MealContainer({ name }: MealContainerProps) {
    const { mealData } = useSelector((state: any) => state.allData)
    const dispatch = useDispatch()
    return (
        <FlatList data={mealData?.[name]} scrollEnabled={false} keyExtractor={(item, index) => index.toString()} contentContainerStyle={{ gap: 4 }} renderItem={({ item, index }) => (
            <View style={styles.box} key={item.id}>
                <Text style={styles.title}> {item.name} </Text>
                <View style={{ alignItems: 'center' }}>
                    <Text style={{ color: 'white' }}>gr</Text>
                    <Text style={{ color: 'white' }}>{item.weight}</Text>
                </View>
                <View style={{ flex: 1, gap: 10 }}>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ color: 'white' }}>Protein</Text>
                        <Text style={{ color: 'white' }}>{(parseInt(item.weight) / 100) * parseFloat(item.protein)}</Text>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ color: 'white' }}>Şeker</Text>
                        <Text style={{ color: 'white' }}>{(parseInt(item.weight) / 100) * parseFloat(item.suger)}</Text>
                    </View>
                </View>
                <View style={{ flex: 1, gap: 10 }}>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ color: 'white' }}>Yağ</Text>
                        <Text style={{ color: 'white' }}>{(parseInt(item.weight) / 100) * parseFloat(item.fat)}</Text>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ color: 'white' }}>Kalori</Text>
                        <Text style={{ color: 'white' }}>{(parseInt(item.weight) / 100) * parseFloat(item.calories)}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
                    <CustomCheckBox name={name} index={index} mealData={mealData} calories={(parseInt(item.weight) / 100) * Math.floor(parseFloat(item.calories))} protein={(parseInt(item.weight) / 100) * Math.floor(parseFloat(item.protein))} yag={(parseInt(item.weight) / 100) * Math.floor(parseFloat(item.fat))} karbonhidrat={(parseInt(item.weight) / 100) * Math.floor(parseFloat(item.suger))} />
                    <Pressable style={{ marginRight: 6, height: '100%' }} onPress={() => {
                        dispatch(writeDataInUsers({ data: { [name]: [...mealData[name].slice(0, index), ...mealData[name].slice(index + 1)] }, writeType: 'update', dataName: 'mealData' }))
                        if (mealData?.[name][index]?.active) {
                            dispatch(writeDataInUsers({ data: { calories: [Number(mealData?.calories ? mealData?.calories : 0) - (parseInt(item.weight) / 100 * Math.floor(parseFloat(item.calories)))] }, writeType: 'update', dataName: 'mealData' }))
                            dispatch(writeDataInUsers({ data: { protein_db: [Number(mealData?.protein_db ? mealData?.protein_db : 0) - parseInt(item.weight) / 100 * Math.floor(parseFloat(item.protein))] }, writeType: 'update', dataName: 'mealData' }))
                            dispatch(writeDataInUsers({ data: { yag_db: [Number(mealData?.yag_db ? mealData?.yag_db : 0) - parseInt(item.weight) / 100 * Math.floor(parseFloat(item.fat))] }, writeType: 'update', dataName: 'mealData' }))
                            dispatch(writeDataInUsers({ data: { karbonhidrat_db: [Number(mealData?.karbonhidrat_db ? mealData?.karbonhidrat_db : 0) - parseInt(item.weight) / 100 * Math.floor(parseFloat(item.suger))] }, writeType: 'update', dataName: 'mealData' }))
                        }
                    }}>
                        <Ionicons name="trash-sharp" size={22} color="white" />
                    </Pressable>
                </View>
            </View>
        )}>
        </FlatList>
    )
}

const styles = StyleSheet.create({
    title: {
        color: 'white',
    },
    box: {
        width: Dimensions.get('window').width * .83,
        height: 100,
        marginBottom: 4,
        borderColor: 'white',
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 15,
        gap: 10
    },
});