import { View, Text, FlatList, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import MealPlanner from '@/components/MealPlanner'
import { useSelector } from 'react-redux'

//Dil Desteği Ekle

export default function ActivityScreen() {
    const { userData, dayCalories } = useSelector((state: any) => state.allData)

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <MealPlanner setHeight={180} mealTypeText='Todey Target' customStyle={{ flex: 1, justifyContent: 'center' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ width: '47%', height: 100, backgroundColor: 'white', borderRadius: 30, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8 }}>
                        <Image source={require('@/assets/images/Bottel.png')} />
                        <View>
                            <Text style={{ fontWeight: '700', fontSize: 14 }}>
                                {userData.weight * 0.033} L
                            </Text>
                            <Text style={{ fontWeight: '700', fontSize: 14 }}>
                                Su İçmelisin
                            </Text>
                        </View>
                    </View>
                    <View style={{ width: '47%', height: 100, backgroundColor: 'white', borderRadius: 30, justifyContent: 'center', flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                        <Image source={require('@/assets/images/FoodImg.png')} />
                        <View>
                            <Text style={{ fontWeight: '700', fontSize: 14 }}>
                                {dayCalories} Kcal
                            </Text>
                        </View>
                    </View>
                </View>
            </MealPlanner>
        </SafeAreaView>
    )
}