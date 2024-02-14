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
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { setBmi } from '@/services/redux/reducers/calculateSlice'

const userUid: any = auth()?.currentUser?.uid

export default function HomeScreen() {
    const { data } = useSelector((state: any) => state.auth)
    const [pieBmiData, setPieBmiData] = useState<any>()
    const dispatch = useDispatch()
    const { t } = useTranslation()
    function bmiHesapla(boy: any, kilo: any) {
        const metreBoy = boy / 100;
        const bmi: any = (kilo / (metreBoy * metreBoy));
        let bmiName;
        if (bmi < 18.5) {
            bmiName = t('homeScreen.bmiWidget.bmiIndexName.underweight');
        } else if (bmi >= 18.5 && bmi < 25) {
            bmiName = t('homeScreen.bmiWidget.bmiIndexName.normal');
        } else if (bmi >= 25 && bmi < 30) {
            bmiName = t('homeScreen.bmiWidget.bmiIndexName.overweight');
        } else {
            bmiName = t('homeScreen.bmiWidget.bmiIndexName.obese');
        }
        setPieBmiData([
            [
                {
                    value: bmi,
                    color: '#009FFF',
                    gradientCenterColor: '#006DFF',
                    focused: true,
                },
                { value: bmi > 32 ? 0 : 32 - bmi, color: '#93FCF8', gradientCenterColor: '#3BE9DE' },
            ],
            bmiName,
            bmi
        ])
        dispatch(setBmi({ bmi, bmiName }))
    }
    useEffect(() => {
        const unsubscribe = firestore()
            .collection(userUid)
            .doc("userData")
            .onSnapshot(
                (documentSnapshot) => {
                    const data: any = documentSnapshot.data();
                    bmiHesapla(data.height, data.weight)
                },
                (error) => {
                    console.error(error);
                }
            );

        return unsubscribe;
    }, [])
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
                            {pieBmiData && <PieChart
                                data={pieBmiData[0]}
                                donut
                                showGradient
                                sectionAutoFocus
                                radius={60}
                                innerRadius={40}
                                innerCircleColor={'#232B5D'}
                                centerLabelComponent={() => {
                                    return (
                                        <View>
                                            <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>{pieBmiData[2] && pieBmiData[2].toFixed(1)}</Text>
                                        </View>
                                    );
                                }}
                            />}
                        </View>
                    </View>
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