import { View, Text, Pressable, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router'
import WidgetContainer from '@/components/WidgetContainer'
import CustomButton from '@/components/CustomButton'
import { PieChart } from "react-native-gifted-charts";
import { setBmi, setUserInfo } from '@/services/redux/reducers/dataSlice'
import { addListenerData } from '@/services/utils/dataListener'


export default function HomeScreen() {
    const { data } = useSelector((state: any) => state.auth)
    const { bmiIndex } = useSelector((state: any) => state.allData)
    const dispatch = useDispatch()
    const { t } = useTranslation()
    const [userData, setUserData] = useState<any>()

    useEffect(() => {
        addListenerData({ setData: setUserData, dataName: 'userData' })
    }, [])
    useEffect(() => {
        if (userData) {
            dispatch(setBmi(userData))
            dispatch(setUserInfo(userData))
        }
    }, [userData])
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
                <Pressable onPress={() => router.push('/(mainapp)/(otherscreens)/notificationscreen/')}>
                    <Ionicons name="notifications-outline" size={24} color="black" />
                </Pressable>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} overScrollMode='never'>
                <WidgetContainer setHeight={150} customStyle={{ padding: 10 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 5 }}>
                        <View style={{ height: '100%', justifyContent: 'space-between', paddingVertical: 12 }}>
                            <Text style={{ fontSize: 18, color: 'white' }}>
                                BMI-{t('homeScreen.bmiWidget.bmi')}
                            </Text>
                            <CustomButton title={t('homeScreen.bmiWidget.button-text')}
                                onP={() => {
                                    router.push('/(mainapp)/(otherscreens)/bmiscreen/')
                                }}
                                customStyle={{ width: 120, height: 45 }}
                                customTextStyle={{ fontSize: 18 }} />
                        </View>
                        <View style={{ height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                            {
                                bmiIndex[0] && <PieChart
                                    data={bmiIndex ? bmiIndex[0] : []}
                                    donut
                                    showGradient
                                    sectionAutoFocus
                                    radius={60}
                                    innerRadius={40}
                                    innerCircleColor={'#232B5D'}
                                    centerLabelComponent={() => {
                                        return (
                                            <View>
                                                <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>{t(`homeScreen.bmiWidget.bmiIndexName.${bmiIndex[1].bmiName.toLowerCase()}`)}</Text>
                                            </View>
                                        );
                                    }}
                                />
                            }
                        </View>
                    </View>
                </WidgetContainer>
                <WidgetContainer setHeight={80} customStyle={{ padding: 10, justifyContent: 'center' }} setBorderRadius={18}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={{ color: 'white', fontSize: 20 }}>
                            Günlük Hedefler
                        </Text>
                        <CustomButton title='Kontrol Et' onP={() => router.push('/(mainapp)/(tabs)/activityscreen/')} customStyle={{ width: 120, height: 50 }} customTextStyle={{ fontSize: 18 }} />
                    </View>
                </WidgetContainer>
                <WidgetContainer setHeight={400}>
                    <Text>Naber</Text>
                </WidgetContainer>
            </ScrollView>
        </SafeAreaView>
    )
}