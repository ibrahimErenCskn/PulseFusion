import { View, Text, Image, FlatList, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import COLOR from '@/constants/Colors';


//Dil Desteği Ekle
//fitness db dil desteği

function capitalizeFirstLetter(word: any) {
    return word.substr(0, 1).toUpperCase() + word.substr(1);
}

export default function FitnessInfoScreen() {
    const params = useLocalSearchParams()
    const db = require('@/services/utils/fitnessDb/db.json')

    const renderItem = ({ item, index }: any) => (
        <View key={index} style={{ marginBottom: 10, alignItems: 'center', width: '100%' }}>
            <View style={{ height: 360, width: '95%', borderRadius: 8, justifyContent: 'center', alignItems: 'center', paddingVertical: 16 }}>
                <Image source={{ uri: item.gifUrl }} style={{ width: 180, height: 180 }} />
                <View style={{ width: '100%', paddingLeft: 12, paddingVertical: 10, gap: 8, backgroundColor: COLOR.appContainerColor, borderRadius: 12 }}>
                    <Text style={{ color: 'white', fontSize: 16 }}>İsmi : {capitalizeFirstLetter(item.name)}</Text>
                    <Text style={{ color: 'white', fontSize: 16 }}>Hedef Bölge : {capitalizeFirstLetter(item.target)}</Text>
                    <Text style={{ color: 'white', fontSize: 16 }}>Ekipmanı : {capitalizeFirstLetter(item.equipment)}</Text>
                    <Text style={{ color: 'white', fontSize: 16 }}>Vucut Bölgesi : {capitalizeFirstLetter(item.bodyPart)}</Text>
                </View>
            </View>
        </View>
    );
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <FlatList
                data={db.filter((exercise: any) => exercise.target === params.name)}
                renderItem={renderItem}
                keyExtractor={(item) => item.id || item.name} // Use ID if available, otherwise fallback to name
                showsVerticalScrollIndicator={false} // Optional: hide scroll indicator
                ListEmptyComponent={() => <Text>No exercises found for this equipment.</Text>} // Empty list message
            />
        </SafeAreaView>
    )
}