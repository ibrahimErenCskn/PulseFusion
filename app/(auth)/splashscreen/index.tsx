import { View, Text, Dimensions, TouchableOpacity, Pressable, Image } from 'react-native'
import React, { useEffect } from 'react'
import { router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from '@/components/CustomButton'
import Carousel from '@/components/Carousel'
import Items from '../../../components/carouselItems/carousel.json'
import { useTranslation } from 'react-i18next'
import * as Location from 'expo-location';
const { width, height } = Dimensions.get('window')

export default function SplashScreen() {
    const { t, i18n } = useTranslation()
    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permission to access location was denied');
                return;
            }
        })();
    }, []);
    const renderItems = ({ item }: any) => {
        return (
            <TouchableOpacity
                onPress={() => console.log('clicked')}
                activeOpacity={1}
            >
                <View style={{ width: width, height: '100%', alignItems: 'center', justifyContent: 'center', gap: 30 }}>
                    <Image source={{ uri: item.url }} width={200} height={200} />
                    <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>{item.description}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#B5C9FF' }}>
            <View style={{ height: height * 0.8, paddingVertical: 60 }}>
                <Carousel carouselItem={Items} renderItems={renderItems} setMaxHeight={400} />
            </View>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <CustomButton onP={() => router.navigate('/(auth)/loginscreen/')} title={t('get-started')} customStyle={{ width: 200 }} />
            </View>
        </SafeAreaView>
    )
}