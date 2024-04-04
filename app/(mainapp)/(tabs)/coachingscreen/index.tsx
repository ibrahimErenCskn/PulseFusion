import { View, Text, Image, ScrollView, FlatList, Dimensions } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from '@/components/CustomButton'
import COLOR from '@/constants/Colors'
import WidgetContainer from '@/components/WidgetContainer'

const DATA = [
    {
        name: 'Ibrahim',
        experience: 'Deneme',
        university: 'San Francisco'
    }, {
        name: 'Eren',
        experience: 'Deneme',
        university: 'San Francisco'
    }, {
        name: 'Coşkun',
        experience: 'Deneme',
        university: 'San Francisco'
    }, {
        name: 'Coşkun',
        experience: 'Deneme',
        university: 'San Francisco'
    }
]


export default function CoachingScreen() {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <FlatList data={DATA} renderItem={({ item }) => (
                <View style={{ flexDirection: 'row', width: '90%', height: 240 }}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-evenly' }}>
                        <View style={{ borderRadius: 1000, borderWidth: 2, borderColor: COLOR.appContainerColor }}>
                            <Image source={require('@/assets/images/EggImg.png')} style={{ width: 120, height: 120 }} resizeMode='contain' />
                        </View>
                        <CustomButton onP={() => console.log('Tıklandı')} title='Chat' customStyle={{ width: 100, backgroundColor: COLOR.appContainerColor }} />
                    </View>
                    <WidgetContainer customStyle={{ flex: 1.6, height: '100%' }}>
                        <View style={{ padding: 14 }}>
                            <Text>
                                İsmi: {item.name}
                            </Text>
                            <Text>
                                Deneyimleri : {item.experience}
                            </Text>
                            <Text>
                                Üniversitesi : {item.university}
                            </Text>
                        </View>
                    </WidgetContainer>
                </View>
            )}
                style={{ width: Dimensions.get('window').width }}
                contentContainerStyle={{ alignItems: 'center', gap: 10 }}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView >
    )
}