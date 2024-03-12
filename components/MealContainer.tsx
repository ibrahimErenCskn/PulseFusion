import { View, Text, FlatList, Image } from 'react-native'
import React from 'react'

export default function MealContainer() {
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'white', borderRadius: 8, paddingHorizontal: 8 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                <Image source={require('@/assets/images/EggImg.png')} style={{ width: 45, height: 45 }} resizeMode='contain' />
                <Text>Egg</Text>
            </View>
            <View style={{ justifyContent: 'center' }}>
                <Text>100 G</Text>
            </View>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Text>50 kcal</Text>
            </View>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Text>Check</Text>
            </View>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Text>Sil</Text>
            </View>
        </View>
    )
}