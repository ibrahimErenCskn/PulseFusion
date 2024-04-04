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



export default function ProfileScreen() {
    const { data, isLoading } = useSelector((state: any) => state.auth)
    const { userData } = useSelector((state: any) => state.allData)
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
                            <CustomButton onP={() => router.push('/(mainapp)/(otherscreens)/profileedit/')} title={t('profileScreen.details-profile-widget.button-text')} customStyle={{ width: 80, height: 45 }} customTextStyle={{ fontSize: 16 }} />
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
                <Pressable onPress={() => logOut()}>
                    <Text>Çıkışı Koy</Text>
                    {isLoading && <ActivityIndicator size={'large'} />}
                </Pressable>
            </ScrollView>
        </SafeAreaView>
    )
}