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
    const { dayCalories, mealData } = useSelector((state: any) => state.allData)
    const { t } = useTranslation()
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>
                <MealPlanner routeFunc={() => router.navigate({ pathname: '/(mainapp)/(otherscreens)/addMealScreen/', params: { type: 1, name: "Kahvaltı" } })} mealTypeText={t('mealPlannerScreen.meal_one')} mealsNumber={mealData?.Kahvaltı ? mealData?.Kahvaltı.length : 0}>
                    <MealContainer name='Kahvaltı' />
                </MealPlanner>
                <MealPlanner routeFunc={() => router.navigate({ pathname: '/(mainapp)/(otherscreens)/addMealScreen/', params: { type: 2, name: "Ogle" } })} mealTypeText={t('mealPlannerScreen.meal_two')} mealsNumber={mealData?.Ogle ? mealData?.Ogle.length : 0} >
                    <MealContainer name='Ogle' />
                </MealPlanner>
                <MealPlanner routeFunc={() => router.navigate({ pathname: '/(mainapp)/(otherscreens)/addMealScreen/', params: { type: 3, name: "Aksam" } })} mealTypeText={t('mealPlannerScreen.meal_three')} mealsNumber={mealData?.Aksam ? mealData?.Aksam.length : 0} >
                    <MealContainer name='Aksam' />
                </MealPlanner>
                <MealProgress progress={mealData?.calories ? mealData?.calories[0] : 1} typeText={t('mealPlannerScreen.calories')} value={Math.floor(dayCalories)} valueText='kCal' />
                <MealProgress progress={mealData?.protein_db ? mealData?.protein_db[0] : 1} typeText={t('mealPlannerScreen.protein')} value={Math.floor((dayCalories * .20) / 4)} valueText='g' />
                <MealProgress progress={mealData?.yag_db ? mealData?.yag_db[0] : 1} typeText={t('mealPlannerScreen.fat')} value={Math.floor((dayCalories * .15) / 9)} valueText='g' />
                <MealProgress progress={mealData?.karbonhidrat_db ? mealData?.karbonhidrat_db[0] : 1} typeText={t('mealPlannerScreen.carbonhidrat')} value={Math.floor((dayCalories * .65) / 4)} valueText='g' />
            </ScrollView>
        </SafeAreaView>
    )
}