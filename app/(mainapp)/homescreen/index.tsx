import { View, Text, Pressable, ScrollView, Dimensions } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router'
import WidgetContainer from '@/components/WidgetContainer'
import CustomButton from '@/components/CustomButton'

export default function HomeScreen() {
    const { data } = useSelector((state: any) => state.auth)
    const { t } = useTranslation()

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ paddingTop: 6, paddingHorizontal: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View>
                    <Text style={{ opacity: .6, fontSize: 18 }}>
                        {t('homeScreen.welcome-back')}
                    </Text>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                        {data?.displayName}
                    </Text>
                </View>
                <Pressable onPress={() => router.navigate('notificationscreen')}>
                    <Ionicons name="notifications-outline" size={24} color="black" />
                </Pressable>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} overScrollMode='never'>
                <WidgetContainer setHeight={150} customStyle={{ padding: 10 }}>
                    <>
                        <View style={{ height: '100%', justifyContent: 'space-between', paddingVertical: 12 }}>
                            <Text style={{ fontSize: 18, color: 'white' }}>
                                BMI-Body Mass Index
                            </Text>
                            <CustomButton title='View More' onP={() => { }} customStyle={{ width: 120, height: 45 }} customTextStyle={{ fontSize: 18 }} />
                        </View>
                    </>
                </WidgetContainer>
                <WidgetContainer setHeight={400}>
                    <Text>Naber</Text>
                </WidgetContainer>
                <WidgetContainer setHeight={400}>
                    <Text>Naber</Text>
                </WidgetContainer>
            </ScrollView>
        </SafeAreaView>
    )
}