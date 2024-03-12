import { View, Text, Pressable, ScrollView, ViewStyle } from 'react-native'
import React from 'react'
import WidgetContainer from './WidgetContainer'
import { useTranslation } from 'react-i18next'
import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';

interface MealPlannerProps {
    mealTypeText: string
    children?: React.ReactElement
    setHeight?: number
    mealsCalories?: number,
    mealsNumber?: number
    customStyle?: ViewStyle
}

export default function MealPlanner({ mealTypeText, children, setHeight, mealsCalories, mealsNumber, customStyle }: MealPlannerProps) {
    const { t } = useTranslation()
    return (
        <WidgetContainer customStyle={{ padding: 12 }} setHeight={setHeight ? setHeight : undefined}>
            <View style={{ gap: 10, flex: 1 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{mealTypeText}</Text>
                        {mealsCalories && mealsNumber ? (
                            <Pressable onPress={() => router.push('/(mainapp)/(otherscreens)/addMealScreen/')}>
                                <AntDesign name="pluscircleo" size={24} color="white" />
                            </Pressable>
                        ) : null}
                    </View>
                    {mealsCalories && mealsNumber ? <Text style={{ color: 'white' }}>{mealsNumber} {t('mealPlannerScreen.meals')} | {mealsCalories} {t('mealPlannerScreen.calories')}</Text> : null}
                </View>
                <View style={[{ gap: 8 }, customStyle]}>
                    {children}
                </View>
            </View>
        </WidgetContainer>
    )
}