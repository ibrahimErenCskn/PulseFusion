import React from 'react'
import { Stack } from 'expo-router'
import { useTranslation } from 'react-i18next'

export default function _layout() {
    const { t } = useTranslation()
    return (
        <Stack initialRouteName='(tabs)'>
            <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
            <Stack.Screen name='(otherscreens)/bmiscreen/index' options={{ animation: 'ios', headerTitle: t('homeScreen.bmiWidget.bmi') }} />
            <Stack.Screen name='(otherscreens)/notificationscreen/index' options={{ animation: 'ios', headerTitle: t('notificationScreen.notification') }} />
            <Stack.Screen name='(otherscreens)/profileedit/index' options={{ animation: 'ios', headerTitle: t('profileEditScreen.edit-profile') }} />
            <Stack.Screen name='(otherscreens)/addMealScreen/index' options={{ animation: 'ios', headerTitle: t('addMealsScreen.title') }} />
            <Stack.Screen name='(otherscreens)/fitnessInfoScreen/index' options={{ animation: 'ios', headerTitle: 'Fitness Haraket Yardım' }} />
            <Stack.Screen name='(otherscreens)/chatScreen/index' options={{ animation: 'ios', headerTitle: 'Sohbet' }} />
            <Stack.Screen name='(otherscreens)/coachingChatScreen/index' options={{ animation: 'ios', headerTitle: 'Sohbet' }} />
            <Stack.Screen name='(otherscreens)/coachingscreen/index' options={{ animation: 'ios', headerTitle: 'Koç Kayıt Ekranı' }} />
        </Stack>
    )
}