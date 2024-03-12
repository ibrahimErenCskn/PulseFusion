import { Dimensions, FlatList, Image, Pressable, ScrollView, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import { writeDataInUsers } from '@/services/redux/reducers/firestore'
import MealProgress from '@/components/MealProgress'
import MealPlanner from '@/components/MealPlanner'
import CustomModal from '@/components/CustomModal'
import SelectedButton from '@/components/SelectedButton'
import CustomButton from '@/components/CustomButton'
import Animated, { LightSpeedInRight } from 'react-native-reanimated'
import { Formik } from 'formik'
import { addMealData, dayCaloriesCalculate } from '@/services/redux/reducers/dataSlice'
import { useTranslation } from 'react-i18next'
import { addListenerData } from '@/services/utils/dataListener'
import LottieAnim from '@/services/lottie/LottieAnim'
import MealContainer from '@/components/MealContainer'


export default function MealScreen() {
    const dispatch = useDispatch()
    const { dayCalories, userData } = useSelector((state: any) => state.allData)
    const [isLoading, setIsLoading] = useState(true);
    const { t } = useTranslation()

    const [changeAction, setChangeAction] = useState(true)
    const [visible, setVisible] = useState(false)
    const [typeData, settypeData] = useState([
        {
            title: "Zayıflamak İstiyorum",
            description: "Description",
            active: false,
            activitiyType: 2
        },
        {
            title: "Kilo Almak İstiyorum",
            description: "Description",
            active: false,
            activitiyType: 1
        },
        {
            title: "Kilomda Devam Etmek İstiyorum",
            description: "Description",
            active: false,
            activitiyType: 0
        }
    ])
    const [movingData, setMovingData] = useState([
        {
            title: "Hareketli Bir Hayatım Var",
            description: "Description",
            active: false,
            activitiyType: 2
        },
        {
            title: "Az Haraket Ediyorum",
            description: "Description",
            active: false,
            activitiyType: 1
        },
        {
            title: "Haraket Etmiyorum",
            description: "Description",
            active: false,
            activitiyType: 0
        }
    ])
    const [firstMealData, setFirstMealData] = useState<any>()

    useEffect(() => {
        addListenerData({ setData: setFirstMealData, dataName: 'mealData' })
    }, [])

    useEffect(() => {
        if (firstMealData) {
            dispatch(addMealData(firstMealData))
            dispatch(dayCaloriesCalculate(userData))
        }
    }, [firstMealData, userData])

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsLoading(false);
        }, 500);
        return () => clearTimeout(timeout);
    }, []);

    if (isLoading) {
        return (
            <LottieAnim anim={require('@/services/lottie/Anim/LoadingAnim.json')} />
        );
    }

    if (!firstMealData) {
        return (
            <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <CustomModal buttonText='Button' buttonStyle={{ backgroundColor: 'red' }} visible={visible} setVisible={setVisible}>
                    <Formik
                        initialValues={{ type1: '', type2: '' }}
                        onSubmit={values => {
                            setChangeAction(!changeAction)
                            setVisible(!visible)
                            dispatch(writeDataInUsers({ data: values, writeType: 'set', dataName: "mealData" }))
                        }}
                    >
                        {({ handleSubmit, setFieldValue, values }) => (
                            changeAction ? (
                                <View style={{ width: Dimensions.get('window').width * 0.9, height: Dimensions.get('window').height * .75, backgroundColor: 'white', borderRadius: 20, paddingVertical: 10 }}>
                                    <View style={{ height: '25%', alignItems: 'center', justifyContent: 'center' }}>
                                        <Image source={require('@/assets/images/MealImg.png')} />
                                    </View>
                                    <View style={{ height: '60%', justifyContent: 'center' }}>
                                        <SelectedButton data={typeData} setData={settypeData} setFieldValue={setFieldValue} type={'type1'} />
                                    </View>
                                    <View style={{ alignItems: 'center' }}>
                                        <CustomButton disabled={values.type1 ? false : true} onP={() => setChangeAction(!changeAction)} title='Sonraki' customStyle={{ borderWidth: 2 }} />
                                    </View>
                                </View>
                            ) :
                                (
                                    <Animated.View entering={LightSpeedInRight} style={{ width: Dimensions.get('window').width * 0.9, height: Dimensions.get('window').height * .75, backgroundColor: 'white', borderRadius: 20, paddingVertical: 10 }}>
                                        <View style={{ height: '25%', alignItems: 'center', justifyContent: 'center' }}>
                                            <Image source={require('@/assets/images/MealImg.png')} />
                                        </View>
                                        <View style={{ height: '60%', justifyContent: 'center' }}>
                                            <SelectedButton data={movingData} setData={setMovingData} setFieldValue={setFieldValue} type={'type2'} />
                                        </View>
                                        <View style={{ alignItems: 'center' }}>
                                            <CustomButton onP={() => {
                                                handleSubmit()
                                            }}
                                                disabled={values.type2 ? false : true}
                                                title='Bitir' customStyle={{ borderWidth: 2 }} />
                                        </View>
                                    </Animated.View>
                                )
                        )}
                    </Formik>
                </CustomModal>
            </SafeAreaView>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>
                <MealPlanner mealTypeText={t('mealPlannerScreen.protein')} mealsCalories={Math.floor(dayCalories * .25)} mealsNumber={4}>
                    <MealContainer />
                    <MealContainer />
                    <MealContainer />
                    <MealContainer />
                    <MealContainer />
                    <MealContainer />
                    <MealContainer />
                    <MealContainer />
                    <MealContainer />
                    <MealContainer />
                    <MealContainer />
                    <MealContainer />
                    <MealContainer />
                </MealPlanner>
                <MealPlanner mealTypeText={t('mealPlannerScreen.fat')} mealsCalories={Math.floor(dayCalories * .15)} mealsNumber={4} >
                    <MealContainer />
                    <MealContainer />
                    <MealContainer />
                    <MealContainer />
                    <MealContainer />
                    <MealContainer />
                </MealPlanner>
                <MealPlanner mealTypeText={t('mealPlannerScreen.carbonhidrat')} mealsCalories={Math.floor(dayCalories * .6)} mealsNumber={4} >
                    <MealContainer />
                    <MealContainer />
                    <MealContainer />
                    <MealContainer />
                    <MealContainer />
                    <MealContainer />
                </MealPlanner>
                <MealProgress progress={'0%'} typeText={t('mealPlannerScreen.calories')} value={Math.floor(dayCalories)} valueText='kCal' />
                <MealProgress progress={'0%'} typeText={t('mealPlannerScreen.protein')} value={Math.floor((dayCalories * .20) / 4)} valueText='g' />
                <MealProgress progress={'0%'} typeText={t('mealPlannerScreen.fat')} value={Math.floor((dayCalories * .15) / 9)} valueText='g' />
                <MealProgress progress={'0%'} typeText={t('mealPlannerScreen.carbonhidrat')} value={Math.floor((dayCalories * .65) / 4)} valueText='g' />
            </ScrollView>
        </SafeAreaView>
    )
}