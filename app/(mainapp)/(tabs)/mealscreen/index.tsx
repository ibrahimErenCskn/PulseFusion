import { ScrollView, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import MealProgress from '@/components/MealProgress'
import MealPlanner from '@/components/MealPlanner'
import { useTranslation } from 'react-i18next'
import MealContainer from '@/components/MealContainer'
import { router } from 'expo-router'


export default function MealScreen() {
    const dispatch = useDispatch()
    const { dayCalories } = useSelector((state: any) => state.allData)
    const { t } = useTranslation()
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>
                <MealPlanner routeFunc={() => router.push('/(mainapp)/(otherscreens)/addMealScreen/')} mealTypeText={t('mealPlannerScreen.meal_one')} mealsCalories={Math.floor(dayCalories * .25)} mealsNumber={4}>
                    <MealContainer />
                </MealPlanner>
                <MealPlanner routeFunc={() => router.push('/(mainapp)/(otherscreens)/addMealScreen/')} mealTypeText={t('mealPlannerScreen.meal_two')} mealsCalories={Math.floor(dayCalories * .15)} mealsNumber={4} >
                    <MealContainer />
                </MealPlanner>
                <MealPlanner routeFunc={() => router.push('/(mainapp)/(otherscreens)/addMealScreen/')} mealTypeText={t('mealPlannerScreen.meal_three')} mealsCalories={Math.floor(dayCalories * .6)} mealsNumber={4} >
                    <MealContainer />

                </MealPlanner>
                <MealProgress progress={0} typeText={t('mealPlannerScreen.calories')} value={Math.floor(dayCalories)} valueText='kCal' />
                <MealProgress progress={0} typeText={t('mealPlannerScreen.protein')} value={Math.floor((dayCalories * .20) / 4)} valueText='g' />
                <MealProgress progress={0} typeText={t('mealPlannerScreen.fat')} value={Math.floor((dayCalories * .15) / 9)} valueText='g' />
                <MealProgress progress={0} typeText={t('mealPlannerScreen.carbonhidrat')} value={Math.floor((dayCalories * .65) / 4)} valueText='g' />
            </ScrollView>
        </SafeAreaView>
    )
}