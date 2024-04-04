import { View, Text, Pressable, ScrollView, ActivityIndicator, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router'
import WidgetContainer from '@/components/WidgetContainer'
import CustomButton from '@/components/CustomButton'
import { PieChart } from "react-native-gifted-charts";
import ProgressBar from '@/components/ProgressBar'


export default function HomeScreen() {
    const { data } = useSelector((state: any) => state.auth)
    const { bmiIndex, dayCalories, activityData, userData } = useSelector((state: any) => state.allData)
    const { t } = useTranslation()
    const intakeCalories = 2000
    const pieData = [
        {
            value: intakeCalories >= dayCalories ? dayCalories : intakeCalories,
            color: '#009FFF',
            gradientCenterColor: '#006DFF',
            focused: true
        },
        { value: dayCalories - intakeCalories < 0 ? 0 : dayCalories - intakeCalories, color: '#93FCF8', gradientCenterColor: '#3BE9DE' }
    ];

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
                <Text style={{ marginLeft: '5%', fontSize: 24, fontWeight: '700' }}>Aktvite Bilgileri</Text>
                <View style={{ width: '90%', alignSelf: 'center', flexDirection: 'row', justifyContent: 'center', gap: 8 }}>
                    <WidgetContainer customStyle={{ flex: 1 }} setHeight={200}>
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-evenly' }}>
                            <Text style={{ fontSize: 18, fontWeight: '700', color: 'white' }}>Kalori</Text>
                            {
                                dayCalories ? <PieChart
                                    donut
                                    innerRadius={35}
                                    radius={60}
                                    showGradient
                                    sectionAutoFocus
                                    data={pieData}
                                    innerCircleColor={'#232B5D'}
                                    centerLabelComponent={() => {
                                        return <View>
                                            <Text style={{ fontSize: 16, color: 'white', fontWeight: '700' }}>{((intakeCalories / dayCalories) * 100).toFixed(0)}%</Text>
                                        </View>;
                                    }}
                                /> : <ActivityIndicator size={'large'} color={'red'} />
                            }
                        </View>
                    </WidgetContainer>

                    <WidgetContainer customStyle={{ flex: 1 }} setHeight={200}>
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ color: 'white', fontSize: 24 }}>Yakında</Text>
                        </View>
                    </WidgetContainer>
                </View>
                <WidgetContainer setHeight={100}>
                    <View style={{ alignItems: 'center', gap: 10 }}>
                        <View style={{ alignItems: 'center', paddingTop: 8 }}>
                            <Text style={{ fontSize: 20, fontWeight: '700', color: 'white' }}>Su Takibi</Text>
                        </View>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', columnGap: 6, rowGap: 4 }}>
                            <ProgressBar progress={activityData?.waterIntake ? parseInt((((activityData?.waterIntake) / ((userData.weight * 0.06) * 1000)) * 100).toFixed(1)) : 0} />
                        </View>
                    </View>
                </WidgetContainer>
            </ScrollView>
        </SafeAreaView>
    )
}