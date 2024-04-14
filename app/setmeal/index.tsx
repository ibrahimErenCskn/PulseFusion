import { View, Text, Image, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Formik } from 'formik'
import SelectedButton from '@/components/SelectedButton'
import CustomButton from '@/components/CustomButton'
import Animated, { LightSpeedInRight } from 'react-native-reanimated'
import { useDispatch, useSelector } from 'react-redux'
import { writeDataInUsers } from '@/services/redux/reducers/firestore'
import { router } from 'expo-router'

export default function SetMeal() {
    const { isLoading } = useSelector((state: any) => state.userData)
    const [changeAction, setChangeAction] = useState(true)
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

    const dispatch = useDispatch()
    return (
        <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
            <Formik
                initialValues={{ type1: '', type2: '' }}
                onSubmit={values => {
                    setChangeAction(!changeAction)
                    dispatch(writeDataInUsers({ data: values, writeType: 'set', dataName: "mealData" }))
                    if (!isLoading) {
                        router.replace('/setactivity/')
                    }
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
        </SafeAreaView>
    )
}