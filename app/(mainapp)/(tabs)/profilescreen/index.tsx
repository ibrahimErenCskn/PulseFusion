import { View, Text, ScrollView, Image, Pressable, ActivityIndicator } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logaut } from '@/services/redux/reducers/authSlice'
import { SafeAreaView } from 'react-native-safe-area-context'
import WidgetContainer from '@/components/WidgetContainer'
import CustomButton from '@/components/CustomButton'
import { useTranslation } from 'react-i18next'
import { router } from 'expo-router'
import { resetData } from '@/services/redux/reducers/dataSlice'
import COLOR from '@/constants/Colors'



export default function ProfileScreen() {
    const { data, isLoading } = useSelector((state: any) => state.auth)
    const { userData, mealData, activityData } = useSelector((state: any) => state.allData)
    const currentYearDate = new Date().getFullYear()
    const { t } = useTranslation()
    const dispatch = useDispatch()

    const logOut = () => {
        dispatch(logaut())
        dispatch(resetData())
    }

    return (
        <SafeAreaView style={{ flex: 1, paddingHorizontal: 10, paddingVertical: 12 }}>
            <ScrollView showsVerticalScrollIndicator={false} overScrollMode='never'>
                <WidgetContainer setHeight={200} customStyle={{ padding: 10 }}>
                    <View style={{ gap: 25 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            {data?.photoURL && <Image source={{ uri: data?.photoURL }} width={70} height={70} borderRadius={40} />}
                            <View style={{ gap: 10 }}>
                                <Text style={{ fontSize: 18 }}>{data?.displayName}</Text>
                            </View>
                            <CustomButton onP={() => router.push({ pathname: '/(mainapp)/(otherscreens)/profileedit/', params: { type: 'profile' } })} title={t('profileScreen.details-profile-widget.button-text')} customStyle={{ width: 80, height: 45 }} customTextStyle={{ fontSize: 16 }} />
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ width: 105, height: 80, backgroundColor: 'white', borderRadius: 30, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: 15, fontWeight: '600' }}>{userData?.height} CM</Text>
                                <Text style={{ fontSize: 15, fontWeight: '600' }}>{t('profileScreen.details-profile-widget.height')}</Text>
                            </View>
                            <View style={{ width: 105, height: 80, backgroundColor: 'white', borderRadius: 30, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: 15, fontWeight: '600' }}>{userData?.weight} KG</Text>
                                <Text style={{ fontSize: 15, fontWeight: '600' }}>{t('profileScreen.details-profile-widget.weight')}</Text>
                            </View>
                            <View style={{ width: 105, height: 80, backgroundColor: 'white', borderRadius: 30, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: 15, fontWeight: '600' }}>{currentYearDate - userData?.birthday?.split(" ").pop()}</Text>
                                <Text style={{ fontSize: 15, fontWeight: '600' }}>{t('profileScreen.details-profile-widget.age')}</Text>
                            </View>
                        </View>
                    </View>
                </WidgetContainer>
                <WidgetContainer customStyle={{ padding: 10 }}>
                    <View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={{ fontSize: 18, fontWeight: '600', color: 'white', marginBottom: 10 }}>
                                Aktivite Bilgileri
                            </Text>
                            <CustomButton
                                onP={() => router.push({ pathname: '/(mainapp)/(otherscreens)/profileedit/', params: { type: 'activity' } })}
                                title={t('profileScreen.details-profile-widget.button-text')}
                                customStyle={{ width: 80, height: 45 }}
                                customTextStyle={{ fontSize: 16 }}
                            />
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ width: '70%', flexDirection: 'row', gap: 10, flexWrap: 'wrap', justifyContent: 'space-between' }}>
                                <View style={{ width: 105, height: 80, backgroundColor: 'white', borderRadius: 30, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 15, fontWeight: '600' }}>{activityData?.dayCount?.title}</Text>
                                </View>
                                <View style={{ width: 105, height: 80, backgroundColor: 'white', borderRadius: 30, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 15, fontWeight: '600' }}>{activityData?.local?.title}</Text>
                                </View>
                                <View style={{ width: 105, height: 80, backgroundColor: 'white', borderRadius: 30, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 15, fontWeight: '600' }}>{activityData?.setCount?.title}</Text>
                                </View>
                                <View style={{ width: 105, height: 80, backgroundColor: 'white', borderRadius: 30, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 15, fontWeight: '600' }}>{activityData?.type?.title}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </WidgetContainer>
                <WidgetContainer customStyle={{ padding: 10 }}>
                    <View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={{ fontSize: 18, fontWeight: '600', color: 'white', marginBottom: 10 }}>
                                Beslenme Bilgileri
                            </Text>
                            <View>
                                <CustomButton onP={() => router.push({ pathname: '/(mainapp)/(otherscreens)/profileedit/', params: { type: 'meal' } })} title={t('profileScreen.details-profile-widget.button-text')} customStyle={{ width: 80, height: 45 }} customTextStyle={{ fontSize: 16 }} />
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'column', gap: 10, flexWrap: 'wrap', justifyContent: 'space-between' }}>
                                <View style={{ width: 180, height: 80, backgroundColor: 'white', borderRadius: 30, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 15, fontWeight: '600' }}>{mealData?.type1?.title}</Text>
                                </View>
                                <View style={{ width: 180, height: 80, backgroundColor: 'white', borderRadius: 30, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 15, fontWeight: '600' }}>{mealData?.type2?.title}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </WidgetContainer>
                <Pressable onPress={() => logOut()} style={{ width: '95%', alignSelf: 'center', height: 50, backgroundColor: COLOR.appContainerColor, alignItems: 'center', justifyContent: 'center', borderRadius: 10, marginBottom: 10 }}>
                    <Text style={{ color: 'white', fontSize: 18, fontWeight: '600' }}>Çıkış Yap</Text>
                    {isLoading && <ActivityIndicator size={'large'} />}
                </Pressable>
            </ScrollView>
        </SafeAreaView>
    )
}